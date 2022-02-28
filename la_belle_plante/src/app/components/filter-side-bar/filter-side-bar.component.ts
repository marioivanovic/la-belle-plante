import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter-side-bar',
  templateUrl: './filter-side-bar.component.html',
  styleUrls: ['./filter-side-bar.component.scss']
})
export class FilterSideBarComponent implements OnInit {
@Input() filteredCategories : string[];

  constructor() {
    this.filteredCategories = [];
   }

  ngOnInit(): void {
  }

}
