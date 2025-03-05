import { Injectable } from '@angular/core';
import { BaseApiService } from '../../common/services/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends BaseApiService<string>{
  private resource = 'products/categories';
   
  getAllCategories() {
    return this.getAll<string>(this.resource);
  }
}
