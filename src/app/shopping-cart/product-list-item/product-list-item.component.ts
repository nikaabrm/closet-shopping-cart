import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../models/product.model';
import { LocalStorageService } from '../../common/services/localstorage.service';

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

  isFavorite = false;
  favoritedProducts:number[] | null = []
  favoriteProductsKey = 'favorite_products'
  

  ngOnInit(): void {
    this.favoritedProducts = this.localsTorageService.get(this.favoriteProductsKey);
    this.isFavorite = this.favoritedProducts?.includes(this.product.id) ||false;
      
  }
  toggleFavorite() {
    let modifiedFavoriteProducts:number[] = [...(this.favoritedProducts || [])]
    if(this.isFavorite){
      const favoriteIndex = modifiedFavoriteProducts.indexOf(this.product.id);
      modifiedFavoriteProducts.splice(favoriteIndex,1);
    }else{
      modifiedFavoriteProducts.push(this.product.id);
    }

    this.favoritedProducts = modifiedFavoriteProducts;
    this.isFavorite = this.favoritedProducts?.includes(this.product.id) ||false;

    this.localsTorageService.set(this.favoriteProductsKey,modifiedFavoriteProducts);
    // this.isFavorite = !this.isFavorite;
  }
  onProductClicked(){
this.productClicked.emit();
  }
}
