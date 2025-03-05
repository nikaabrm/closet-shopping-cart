import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailedService } from './product-detailed.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-detailed',
  standalone: false,
  templateUrl: './product-detailed.component.html',
  styleUrl: './product-detailed.component.scss'
})
export class ProductDetailedComponent {

  product: Product;
  count = 1;
  countIncreased(){
    this.count++
  }
  countDecreased(){
 
    this.count--

  }

  constructor(private activatedRoute: ActivatedRoute,private productDetailedService: ProductDetailedService){
    this.activatedRoute.paramMap.subscribe((params) => {
      const recipeId = params.get('id');

      if (!recipeId) {
        return;
      }

      this.productDetailedService.getProductById(recipeId).subscribe((product :Product) => {
       this.product = product;
       console.log(product);
      });
    });
  }

}
