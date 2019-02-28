import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { GridColumn, GridSaved } from './grid-column';

export enum SortType {
  DESC = -1,
  ASC = 1,
  NORMAL = 0
}

enum BoolIcons {
  ICON_TRUE = 'fa-check',
  ICON_FALSE = 'fa-ban icon-fade'
}

@Component({
  selector: 'vdp-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements AfterViewInit, OnInit {
  private orderedColumns: GridColumn[] = [];
  private hasEdition = false;
  fieldSort: GridColumn;

  @ViewChild('tableElement') tableElement;

  @Input()
  viewName: string;

  @Input()
  columns: GridColumn[] = [];

  @Input()
  elements: any[] = [];

  @Output()
  clickSort = new EventEmitter();

  @Output()
  clickEdit = new EventEmitter();

  @Output()
  clickRemove = new EventEmitter();

  constructor(
    private messageService: MessageService,
    private spinner: NgxSpinnerService
  ) { }

  onClickEdit(element: any) {
    this.clickEdit.emit(element);
  }

  onClickRemove(element: any) {
    this.clickRemove.emit(element);
  }

  onSort(element: any) {
    this.orderedColumns.forEach(column => column.sort = 0);
    const orderedColumn = this.orderedColumns.find(column => column.property === element.sortField);
    orderedColumn ? orderedColumn.sort = element.sortOrder : null;
    this.clickSort.emit(element);
  }

  ngAfterViewInit() {
    this.tableElement.onColReorder.subscribe(data => {
      this.hasEdition = true;
      this.orderedColumns = data.columns;
    });
  }

  ngOnInit() {

  }

  getHeaderStyle(column: GridColumn) {
    let style = {};

    if (column.width)
      style = { ...style, 'width': column.width + 'px' };

    if (column.textAlign)
      style = { ...style, 'text-align': column.textAlign };

    return style;
  }

  formatByPropType(value: any, column: GridColumn): string {
    switch (column.type) {
      case 'boolean/icon':
        return value ? BoolIcons.ICON_TRUE : BoolIcons.ICON_FALSE
      case 'boolean/icon-reverse':
        return value ? BoolIcons.ICON_FALSE : BoolIcons.ICON_TRUE
      case 'boolean/string':
        return value ? 'Sim' : 'Não'
      case 'enum':
        if (column.enumOptions) {
          return column.enumOptions.find((opt) => opt.value == value).name;
        } else {
          return value;
        }
      default:
        return value;
    }
  }

  private mergeOrderColumns(orderedColumns: GridSaved[]) {
    return orderedColumns.map((ordered: GridSaved) => {
      const newColumn = this.columns
        .find(column => ordered.property === column.property);
      newColumn.sort = ordered.sort;
      return newColumn;
    });
  }

  visibleButtons(buttons: any[], element): any[] {
    return buttons.filter(b => b.isVisible ? b.isVisible(element) : true);
  }
}
