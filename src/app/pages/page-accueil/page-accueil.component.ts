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
  private data: any[] | undefined;
  public listCategories!: string[];
  private subListProduct: Subscription;
  public listProduct!: any[];
  public term!: '';

  min: number = 30;
  max: number = 120;
  options: Options = {
    floor: 0,
    ceil: 150,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + '€';
        case LabelType.High:
          return value + '€';
        default:
          return value + '€';
      }
    }
  };

  constructor(private plantService: PlantService) {
    this.subListProduct = this.plantService.subjectListProduct$.subscribe(
      response => {
        console.log('here', response);
        this.data = response;
        this.listCategories = _.uniq(this.data.map(x => x.breadcrumb_label));
        console.log(this.listCategories);

        response.length = 40; // juste pour le dev dans notre contexte d'apprentissage
        this.listProduct = [...response];
      }
    );

    this.plantService.getListProductsChaud();
  }

  ngOnInit(): void {}

  // methode de cycle de vie de mon composant qui est executée juste avant que l'instance de mon composant soit détruite
  ngOnDestroy(): void {
    this.subListProduct.unsubscribe();
  }

  addItem(term: any) {
    console.log(term);
    this.plantService.subjectListProduct$.subscribe(products => {
      if (term.trim() != '') {
        this.listProduct = products.filter(product => {
          return product.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
      } else {
        this.listProduct = products;
      }
    });
    this.plantService.getListProductsChaud();
  }

  displayItem($event: any) {
    this.plantService.subjectListProduct$.subscribe(listProduct => {
      this.listProduct = listProduct.filter(product => {
        return (
          product.unitprice_ati >= $event.value &&
          product.unitprice_ati <= $event.highValue
        );
      });
      console.log('yoo', listProduct);
    });
    this.plantService.getListProductsChaud();
  }
}
