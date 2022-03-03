import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlantService } from 'src/app/services/plant.service';
import * as _ from 'underscore';
import { Options, LabelType } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss']
})
export class PageAccueilComponent implements OnInit {
  // private data!: any[]; same as below
  private data: any[] | undefined; /* Declare le type de ma propriété */
  public listCategories!: string[]; /* ! : type of prop could be undefined */
  private subListProduct: Subscription;
  public listProduct!: any[];
  public term!: '';
  public listProductFiltered!: any[];
  public isAscendingSort: boolean = false;
  public table: any = [];

  min: number = 0;
  max: number = 150;
  options: Options = {
    floor: 0,
    ceil: 150,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          return '<b>Max price:</b> $' + value;
        default:
          return '$' + value;
      }
    }
  };

  constructor(private plantService: PlantService) {
    console.log('table', this.table);

    this.subListProduct = this.plantService.subjectListProduct$.subscribe(
      response => {
        console.log(response);
        this.data = response;
        this.listCategories = _.uniq(this.data.map(x => x.breadcrumb_label));
        console.log(this.listCategories);

        //  response.length = 40; // juste pour le dev dans notre contexte d'apprentissage
        this.listProduct = [...response];
        this.listProductFiltered = this.listProduct;
      }
    );
    this.plantService.getListProductsChaud();
    // declancher la req API et la resp est transmise avec un Subject
  }

  ngOnInit(): void {}
  // Methode de cycle de vie de mon composant qui est executee
  // juste avant l'instance de mon composant soit detruite

  ngOnDestroy(): void {
    this.subListProduct.unsubscribe();
  }

  addItem(term: any) {
    console.log(term);
    this.plantService.subjectListProduct$.subscribe(products => {
      if (term.trim() != '') {
        this.listProductFiltered = products.filter(product => {
          return product.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
      } else {
        this.listProduct = products;
      }
    });
    this.plantService.getListProductsChaud();
  }

  displayItem($event: any) {
    this.plantService.subjectListProduct$.subscribe(listProductFiltered => {
      this.listProductFiltered = listProductFiltered.filter(product => {
        return (
          product.unitprice_ati >= $event.value &&
          product.unitprice_ati <= $event.highValue
        );
      });
      // console.log($event.value)
      // console.log($event.highValue)
      console.log(listProductFiltered);
      this.table = [$event.value, $event.highValue];
      console.log(this.table);
    });
    this.plantService.getListProductsChaud();
  }

  onClickBtn(arr: any): void {
    console.log(`Event Change : $eventValue`);
    this.isAscendingSort != this.isAscendingSort;
    arr.sort((a: any, b: any) => {
      if (a.unitprice_ati < b.unitprice_ati) {
        return -1;
      } else if (a.unitprice_ati > b.unitprice_ati) {
        return 1;
      } else {
        return 0;
      }
    });
    return arr;
  }

  changeCategory(event: any) {
    console.log('arrayCat', event);
    if (event.length !== 0) {
      this.listProductFiltered = this.listProduct.filter(x =>
        event.includes(x.breadcrumb_label)
      );
      console.log('check >', this.table[0] + ' ' + this.table[1]);

      this.listProductFiltered = this.listProductFiltered.filter(
        x =>
          x.unitprice_ati >= this.table[0] && x.unitprice_ati <= this.table[1]
      );
    } else {
      this.listProductFiltered = this.listProduct;
      window.location.reload();
    }
  }
}
