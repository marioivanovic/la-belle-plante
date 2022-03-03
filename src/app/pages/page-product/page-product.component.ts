import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantService } from 'src/app/services/plant.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-page-product',
  templateUrl: './page-product.component.html',
  styleUrls: ['./page-product.component.scss']
})
export class PageProductComponent implements OnInit {
  private data: any[] | undefined;
  public plant: any;

  constructor(
    private plantService: PlantService,
    private active: ActivatedRoute
  ) {
    const id = this.active.snapshot.queryParamMap.get('id');

    if (id) {
      this.plantService.getById(id).subscribe(product => {
        this.data = product;
        this.plant = product;
      });
    }
  }

  ngOnInit(): void {}

  // methode de cycle de vie de mon composant qui est executée juste avant que l'instance de mon composant soit détruite
  ngOnDestroy(): void {}
}
