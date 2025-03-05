import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../models/product.model';
import { LocalStorageService } from '../../common/services/localstorage.service';
import { FAVORITE_STORAGE_KEY } from '../../common/constants/localstorage.constant';

@Component({
  selector: 'app-product-list-item',
  standalone: false,
  templateUrl: './product-list-item.component.html',
  styleUrl: './product-list-item.component.scss'
})
export class ProductListItemComponent implements OnInit {
  constructor(private readonly localStorageService: LocalStorageService) {}

  @Input() product: Product;
  @Output() productClicked = new EventEmitter();
  @Output() favoriteRemoved = new EventEmitter<number>();

  isFavorite = false;
  favoritedProducts: number[] = [];

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites() {
    const storedFavorites = this.localStorageService.get(FAVORITE_STORAGE_KEY);
    this.favoritedProducts = Array.isArray(storedFavorites) ? storedFavorites : [];
    this.isFavorite = this.favoritedProducts.includes(this.product.id);
  }

  toggleFavorite() {
    // Get the current favorites from localStorage to ensure we have the latest data
    const storedFavorites = this.localStorageService.get(FAVORITE_STORAGE_KEY);
    const currentFavorites = Array.isArray(storedFavorites) ? storedFavorites : [];
    
    if (this.isFavorite) {
      // Remove from favorites
      const updatedFavorites = currentFavorites.filter((id: number) => id !== this.product.id);
      this.localStorageService.set(FAVORITE_STORAGE_KEY, updatedFavorites);
      this.favoriteRemoved.emit(this.product.id);
    } else {
      // Add to favorites
      const updatedFavorites = [...currentFavorites, this.product.id];
      this.localStorageService.set(FAVORITE_STORAGE_KEY, updatedFavorites);
    }

    // Update local state
    this.isFavorite = !this.isFavorite;
    this.loadFavorites();
  }

  onProductClicked() {
    this.productClicked.emit();
  }
}
