import { Injectable } from '@angular/core';
import { BaseApiService } from '../../common/services/base-api.service';
import { GetProductsParams, Product } from '../models/product.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsListService extends BaseApiService<{
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: 4.1; count: 259 };
  title: string;
}>{
  private resource = 'products';
   
  getAllProducts(params?:GetProductsParams) {
    return this.getAll<Product>(this.resource,params);
  }
}