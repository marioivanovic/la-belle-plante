import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-product',
  templateUrl: './page-product.component.html',
  styleUrls: ['./page-product.component.scss'],
})
export class PageProductComponent implements OnInit {
  private data: any[] | undefined;
  public listCategories!: string[];
  public listProduct!: any[];
  constructor() {}

  ngOnInit(): void {}
}