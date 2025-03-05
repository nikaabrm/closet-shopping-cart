export interface Product{
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: { rate: number; count: number };
    title: string;

}

 export enum SortOrder{
    DESC='desc',
    ASC='asc'
 }

 export interface GetProductsParams{
    sort:SortOrder
 }

 export enum ProductListPageType {
   FAVORITE='favorite',
   PRODUCT='product'
 }