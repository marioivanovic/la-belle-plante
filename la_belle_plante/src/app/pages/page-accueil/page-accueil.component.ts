import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlantService } from 'src/app/services/plant.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-page-accueil',
  templateUrl: './page-accueil.component.html',
  styleUrls: ['./page-accueil.component.scss'],
})
export class PageAccueilComponent implements OnInit {
  // private data!: any[]; same as below
  private data: any[] | undefined;
  public listCategories!: string[];
  private subListProduct: Subscription;
  public listProduct!: any[];

  searchKey: string = "";
  searchTerm: string = "";

  constructor(private plantService: PlantService) {
    this.subListProduct = this.plantService.subjectListProduct$.subscribe(
      (response) => {
        console.log('here', response);
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

<<<<<<< HEAD
  ngOnInit(): void {
    this.plantService.search.subscribe((val:any) =>{
      this.searchKey = val;
    })
  }
=======
  ngOnInit(): void {}
>>>>>>> 65eb95485a930b6bbab3ae34f90cddba2ab15581

  // methode de cycle de vie de mon composant qui est executée juste avant que l'instance de mon composant soit détruite
  ngOnDestroy(): void {
    this.subListProduct.unsubscribe();
  }
<<<<<<< HEAD

  Search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.plantService.search.next(this.searchTerm);
    console.log(this.searchKey)
 }

=======
>>>>>>> 65eb95485a930b6bbab3ae34f90cddba2ab15581
}
