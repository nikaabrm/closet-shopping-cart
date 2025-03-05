import { Injectable } from '@angular/core';
import { BaseApiService } from '../../common/services/base-api.service';
import { GetProductsParams, Product } from '../models/product.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsListService extends BaseApiService{
  private resource = 'products';
   
  getAllProducts(params?:GetProductsParams) {
    return this.get<Product>(this.resource,params);
  }
}