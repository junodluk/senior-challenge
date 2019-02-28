export const ItemUnit = [
  { name: 'Litro (lt)', suffix: 'lt', precision: 3, value: 1 },
  { name: 'Quilograma (kg)', suffix: 'kg', precision: 2, value: 2 },
  { name: 'Unidade (un)', suffix: 'un', precision: 0, value: 3 }
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
