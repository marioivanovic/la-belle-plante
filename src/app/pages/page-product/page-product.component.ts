import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlantService } from 'src/app/services/plant.service';
import { AvisBarComponent } from 'src/app/components/avis-bar/avis-bar.component';
import * as _ from 'underscore';

@Component({
  selector: 'app-page-product',
  templateUrl: './page-product.component.html',
  styleUrls: ['./page-product.component.scss'],
})
export class PageProductComponent implements OnInit {
  @Input() plant: any;
  public lengthListProduct!: number;

  constructor(private plantService: PlantService) {
    this.plantService.subjectListProduct$.subscribe((data) => {
      this.lengthListProduct = data.length;
    });
  }

  ngOnInit(): void {}
}
