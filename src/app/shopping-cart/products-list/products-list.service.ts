import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../../common/services/base-api.service';

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
   
  getAllProducts() {
    return this.getProducts(this.resource);
  }
}