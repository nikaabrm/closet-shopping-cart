import { Component, OnInit } from '@angular/core';
import { FAVORITE_STORAGE_KEY } from '../../common/constants/localstorage.constant';
import { LocalStorageService } from '../../common/services/localstorage.service';
import { ProductListPageType } from '../models/product.model';

@Component({
  selector: 'app-favorites',
  standalone: false,
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  favoritedProductIds: number[] = [];
  PRODUCT_LIST_PAGE_TYPE = ProductListPageType;
  constructor(private readonly localstorageService: LocalStorageService) {}

  ngOnInit() {
    this.getFavoriteProductIds();
  }

  getFavoriteProductIds() {
    this.favoritedProductIds =
      this.localstorageService.get(FAVORITE_STORAGE_KEY) || [];
  }

  favoriteRemoved(itemId: number) {
    console.log(itemId, '----');
    this.favoritedProductIds = this.favoritedProductIds.filter(
      (productId) => productId !== itemId
    );
  }
}
