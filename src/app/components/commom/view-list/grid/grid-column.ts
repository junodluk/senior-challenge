import { ButtonAction } from './button-action';

export class GridColumn {
    property: string;
    label: string;
    type: string;
    sort?: number;
    width?: number;
    textAlign?: string = 'left';
    sortable = true;
    orderable = true;

    enumOptions?: { name: string, value: number }[];

    buttons?: ButtonAction[];
    dropdownButtons?: boolean;

    linkLabel?: string;
    onClickLink?: Function;

    checkbox?: CheckboxConfig;
}

export interface CheckboxConfig {
  onChange: Function;
}

export class GridSaved {
    property: string;
    sort: number;
}
