import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avis-bar',
  templateUrl: './avis-bar.component.html',
  styleUrls: ['./avis-bar.component.scss'],
})
export class AvisBarComponent implements OnInit {
  public statesStar: any[];
  constructor() {
    this.statesStar = new Array(5);
  }

  ngOnInit(): void {}

  public onChangeValue(eventValue: any): void {
    console.log('Event Change :', eventValue);
  }
}
