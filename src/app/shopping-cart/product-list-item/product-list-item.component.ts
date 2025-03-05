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
export class ProductListItemComponent implements OnInit{
  constructor(private readonly localsTorageService: LocalStorageService ){}

  @Input() product:Product;
  @Output() productClicked =  new EventEmitter();
  @Output() favoriteRemoved =  new EventEmitter<number>();

  isFavorite = false;
  favoritedProducts:number[] | null = []
  

  ngOnInit(): void {
    this.favoritedProducts = this.localsTorageService.get(FAVORITE_STORAGE_KEY);
    this.isFavorite = this.favoritedProducts?.includes(this.product.id) ||false;
      
  }
  toggleFavorite() {
    let modifiedFavoriteProducts:number[] = [...(this.favoritedProducts || [])]
    if(this.isFavorite){
      const favoriteIndex = modifiedFavoriteProducts.indexOf(this.product.id);
      modifiedFavoriteProducts.splice(favoriteIndex,1);
      this.favoriteRemoved.emit(this.product.id);
    }else{
      modifiedFavoriteProducts.push(this.product.id);
    }

    this.favoritedProducts = modifiedFavoriteProducts;
    this.isFavorite = this.favoritedProducts?.includes(this.product.id) ||false;

    this.localsTorageService.set(FAVORITE_STORAGE_KEY,modifiedFavoriteProducts);
  }
  onProductClicked(){
this.productClicked.emit();
  }
}
