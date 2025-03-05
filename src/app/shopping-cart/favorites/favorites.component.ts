import { Component, OnInit, ViewChild } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { MatPaginator } from '@angular/material/paginator';
import { GetProductsParams, Product, ProductListPageType, SortOrder } from '../models/product.model';
import { CategoriesService } from '../categories/categories.service';
import { ProductsListService } from '../products-list/products-list.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../common/services/localstorage.service';
import { FAVORITE_STORAGE_KEY } from '../../common/constants/localstorage.constant';

@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  favoritedProductIds :number[] = [];
  PRODUCT_LIST_PAGE_TYPE = ProductListPageType;

 constructor(private readonly localstorageService:LocalStorageService){
  
 }

 ngOnInit(){
  this.getFavoriteProductIds()
 }

 getFavoriteProductIds(){
  this.favoritedProductIds = this.localstorageService.get(FAVORITE_STORAGE_KEY) || [];
 }

 favoriteRemoved(itemId:number){
  console.log(itemId,'----')
  this.favoritedProductIds = this.favoritedProductIds.filter(productId=> productId !== itemId)
 }
}
