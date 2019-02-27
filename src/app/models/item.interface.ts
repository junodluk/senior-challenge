export enum ItemUnit {
  LITRO = 1,
  QUILOGRAMA = 2,
  UNIDADE = 3
}

export interface ItemModel {
    id?: string;
    name?: string;
    unit?: ItemUnit;
    amount?: number;
    price?: number;
    perishable?: boolean;
    expirationDate?: Date;
    productionDate?: Date;
}
