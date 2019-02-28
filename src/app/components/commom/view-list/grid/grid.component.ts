import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import * as Responses from '../../../../models/response.model';
import { GridColumn, GridSaved } from './grid-column';
import { GridSave } from './grid-save';

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
export class GridComponent implements AfterViewInit, OnDestroy, OnInit {
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
  ) {
    this.buildBehaviors();
  }

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
    // if (this.viewName) {
    //   this.menuViewsService.getGridByView(this.viewName);
    // }
  }

  ngOnDestroy() {
    // if (this.hasEdition) {
    //   this.menuViewsService.saveGrid({
    //     view: this.viewName,
    //     columns: this.orderedColumns.filter(column => column.type !== 'button')
    //   });
    // }
  }

  buildBehaviors() {
    // this.menuViewsService.gridBehavior.next({ state: 'notLoaded' });
    // this.menuViewsService.gridBehavior
    //   .subscribe((response: Responses.ResponseData<GridSave>) => {
    //     if (Responses.isResponseDataError(response)) {
    //       this.messageService.add({
    //         severity: 'warn',
    //         summary: 'Configuração da tabela',
    //         detail: 'Erro ao salvar as configurações.'
    //       });
    //     }
    //   }
    // );

    // this.menuViewsService.userGridColumnsBehavior.next({ state: 'notLoaded' });
    // this.menuViewsService.userGridColumnsBehavior
    //   .subscribe((response: Responses.ResponseData<GridSaved[]>) => {
    //     if (Responses.isResponseDataLoading(response)) {
    //       this.spinner.show();
    //     } else if (Responses.isResponseDataOk(response)) {
    //       if (response.data.length) {
    //         const newColumnsOrdered = this.mergeOrderColumns(response.data);
    //         this.fieldSort = newColumnsOrdered.find(column => column.sort !== SortType.NORMAL);
    //         this.onSort({ sortField: this.fieldSort.property, sortOrder: this.fieldSort.sort });

    //         const buttonColumn = this.columns.find(column => column.type === 'button');
    //         buttonColumn && newColumnsOrdered.push(buttonColumn);

    //         this.columns = newColumnsOrdered;
    //       }
    //       this.spinner.hide();
    //     } else if (Responses.isResponseDataError(response)) {
    //       this.spinner.hide();
    //     }
    //   }
    // );
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
