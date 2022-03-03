import { Component, OnInit, Input, Output} from '@angular/core';

@Component({
  selector: 'app-btn-filter',
  templateUrl: './btn-filter.component.html',
  styleUrls: ['./btn-filter.component.scss']
})
export class BtnFilterComponent implements OnInit {

@Output() arr: any = [];
@Output() isAscendingSort: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
