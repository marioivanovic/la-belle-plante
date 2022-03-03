import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlantService } from 'src/app/services/plant.service';


@Component({
  selector: 'app-filter-side-bar',
  templateUrl: './filter-side-bar.component.html',
  styleUrls: ['./filter-side-bar.component.scss']
})

export class FilterSideBarComponent implements OnInit {
  selectedCategory : string[];
  @Input() listCategoriesFilter: string[];
  @Output() filterArray: EventEmitter<any> = new EventEmitter;

  constructor(private plantService: PlantService) {
    this.listCategoriesFilter = [];
    this.selectedCategory = [];
    // this.plantService.myCategorys(this.selectedCategory)
   }

  ngOnInit(): void {
  }

  public onChangeValue(eventValue: any , category : string): void {
    if (eventValue.target.checked ) {

      // console.log(category + " checked");
       this.selectedCategory.push(category)
    } else {

      // console.log(category + " unchecked");
       this.selectedCategory = this.selectedCategory.filter(c=>c!=category);
    }
    // console.log(this.selectedCategory);
     this.filterArray.emit(this.selectedCategory);
  }



}