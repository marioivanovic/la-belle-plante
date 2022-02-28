import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiProductsService } from './../../services/api-products.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss'],
})
export class PageAccueilComponent implements OnInit {
  private data: any[] | undefined;
  public filteredCategory!: string[];
  private subListProduct: Subscription;

  constructor(private ApiProductsService: ApiProductsService) {
    this.subListProduct = this.ApiProductsService.subjectListProduct$.subscribe(
      (response) => {
        console.log(response);
        this.data = response;
        this.filteredCategory = _.uniq(
          this.data.map((x) => x.product_breadcrumb_label)
        );
        console.log(this.filteredCategory);
      }
    );

    this.ApiProductsService.getListProductsChaud();
  }

  ngOnInit(): void {}

  // methode de cycle de vie de mon composant qui est executée juste avant que l'instance de mon composant soit détruite
  ngOnDestroy(): void {
    this.subListProduct.unsubscribe();
  }
}
