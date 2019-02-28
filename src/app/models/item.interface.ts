export const ItemUnit = [
  { name: 'Litro', short: 'lt', value: 1 },
  { name: 'Quilograma', short: 'kg', value: 2 },
  { name: 'Unidade', short: 'un', value: 3 }
]

export interface ItemModel {
    id?: string;
    name?: string;
    unit?: number;
    amount?: number;
    price?: number;
    perishable?: boolean;
    expirationDate?: Date;
    productionDate?: Date;
}
