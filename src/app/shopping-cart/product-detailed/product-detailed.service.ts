import { Injectable } from '@angular/core';
import { BaseApiService } from '../../common/services/base-api.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailedService extends BaseApiService {
  private resource = 'products';

  getProductById(id: string) {
    return this.getById<Product>(this.resource, id);
  }
}
