import { GridColumn } from '../grid/grid-column';
// import { ViewButton } from './view-button';
import { ButtonAction } from '../grid/button-action';

export class ViewList {
    title: string;
    viewName?: string;
    columns: GridColumn[] = [];
    buttons?: ButtonAction[];
}
