import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlantService } from 'src/app/services/plant.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-page-product',
  templateUrl: './page-product.component.html',
  styleUrls: ['./page-product.component.scss'],
})
export class PageProductComponent implements OnInit {
  private data: any[] | undefined;
  public listCategories!: string[];
  private subListProduct: Subscription;
  public listProduct!: any[];

  constructor(private plantService: PlantService) {
    this.subListProduct = this.plantService.subjectListProduct$.subscribe(
      (response) => {
        console.log(response);
        this.data = response;
        this.listCategories = _.uniq(
          this.data.map((x) => x.product_breadcrumb_label)
        );
        console.log(this.listCategories);

        response.length = 40; // juste pour le dev dans notre contexte d'apprentissage
        this.listProduct = [...response];
      }
    );

    this.plantService.getListProductsChaud();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subListProduct.unsubscribe();
  }
}
