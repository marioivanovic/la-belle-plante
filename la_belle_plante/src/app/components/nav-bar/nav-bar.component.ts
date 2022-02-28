import { Component, OnInit } from '@angular/core';
import { ApiProductsService } from './../../services/api-products.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  public title: string;

  constructor(private ApiProductsService: ApiProductsService) {
    this.title = '🪴 La Belle Plante';
  }

  ngOnInit(): void {}
}
