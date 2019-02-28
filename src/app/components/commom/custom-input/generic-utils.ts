import * as _ from 'lodash';
import { GridColumn } from '../view-list/grid/grid-column';

export class GenericUtils {

  static cleanEmailViewEngine(email: string): string {
    return email ? String(email)
      .normalize('NFD').replace(/['`ˆ~!˜#%^&$*()|+¨=?;:'´",<>\{\}\[\]\\\/]/gi, '')
      .replace(/[\u0300-\u036f]/g, '') : email;
  }

  static cleanStringViewEngine(value: string): string {
    return value ? String(value)
      .normalize('NFD').replace(/[-'`~!@#ˆ˜$%^&*()_|+¨=?;:'´",.<>\{\}\[\]\\\/]/gi, '')
      .replace(/[\u0300-\u036f]/g, '') : '';
  }

  static buildColumnsFromDictionary(dictionary: any): any {
    return _.keys(dictionary).map((property) => {
      return { property: property, label: dictionary[property], sortable: true, orderable: true };
    });
  }

  static s2ab(byteCharacters: any): any {
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    return new Uint8Array(byteNumbers);
  }

  static buildColumnsFromGrid(gridColumns: GridColumn[]): GridColumn[] {
    gridColumns.map(gc => {
      gc.sortable = true;
      gc.orderable = true;
    });

    return gridColumns;
  }
}
