import { Component, OnInit } from '@angular/core';
import { ApiProductsService } from './../../services/api-products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-plant',
  templateUrl: './card-plant.component.html',
  styleUrls: ['./card-plant.component.scss'],
})
export class CardPlantComponent implements OnInit {
  public data: any[] | undefined;
  public filteredCategory!: string[];
  private subListProduct: Subscription;

  constructor(private ApiProductsService: ApiProductsService) {
    this.subListProduct = this.ApiProductsService.subjectListProduct$.subscribe(
      (response) => {
        console.log(response);
        this.data = response;
        this.filteredCategory = this.data.map((x) => x);

        console.log('<<<>', this.filteredCategory);
      }
    );
  }

  ngOnInit(): void {}
}
