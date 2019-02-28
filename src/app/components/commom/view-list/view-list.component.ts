import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ViewList } from './models/view-list';


@Component({
  selector: 'vdp-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss']
})
export class ViewListComponent implements OnInit {

  @Input()
  view: ViewList;

  @Input()
  elements: any[] = [];

  @Output()
  clickSort = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClickSort(e: any) {
    this.clickSort.emit(e);
  }

}
