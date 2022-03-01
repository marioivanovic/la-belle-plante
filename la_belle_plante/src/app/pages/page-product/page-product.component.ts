import { Component, Input, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlantService } from 'src/app/services/plant.service';
import * as _ from 'underscore';
>>>>>>> 65eb95485a930b6bbab3ae34f90cddba2ab15581

@Component({
  selector: 'app-page-product',
  templateUrl: './page-product.component.html',
  styleUrls: ['./page-product.component.scss'],
})
export class PageProductComponent implements OnInit {
<<<<<<< HEAD
  @Input() plant: any;
  private data: any[] | undefined;
  public listCategories!: string[];
  public listProduct!: any[];

  constructor() {}
=======
  // private data: any[] | undefined;
  // private subListProduct: Subscription;
  // public listProduct!: any[];
  public plant: any;
>>>>>>> 65eb95485a930b6bbab3ae34f90cddba2ab15581

  constructor(
    private plantService: PlantService,
    private active: ActivatedRoute
  ) {
    // this.subListProduct = this.plantService.subjectListProduct$.subscribe(
    //   (response) => {
    //     console.log('hop', response);
    //     this.data = response;
    //     this.listProduct = _.uniq(this.data.map((x) => x));
    //     console.log('coucou', this.listProduct);
    //     response.length = 40; // juste pour le dev dans notre contexte d'apprentissage
    //     this.listProduct = [...response];
    //   }
    // );
    // this.plantService.getListProductsChaud();
  }

  ngOnInit(): void {
    const id = this.active.snapshot.queryParamMap.get('id');

    if (id) {
      this.plantService.getById(id).subscribe((product) => {
        console.log('detail ----> ', product);
        this.plant = product[0];
      });
    }
  }

  // methode de cycle de vie de mon composant qui est executée juste avant que l'instance de mon composant soit détruite
  ngOnDestroy(): void {}
}
