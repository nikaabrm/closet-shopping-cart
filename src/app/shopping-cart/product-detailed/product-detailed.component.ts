import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailedService } from './product-detailed.service';
import { Product } from '../models/product.model';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsListService } from '../products-list/products-list.service';

@Component({
  selector: 'app-product-detailed',
  standalone: false,
  templateUrl: './product-detailed.component.html',
  styleUrl: './product-detailed.component.scss',
})
export class ProductDetailedComponent {
  customOptions: OwlOptions = {
    loop: false,
    rewind: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    margin: 10,
    navSpeed: 700,
    nav: true,
    navText: ['<i class="bi bi-chevron-left fs-5 text-body-emphasis"></i>', '<i class="bi bi-chevron-right fs-5 text-body-emphasis"></i>'],
  };

  product: Product;
  count = 1;
  products: Product[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productDetailedService: ProductDetailedService,
    private productsListService: ProductsListService,
    private router: Router
  ) {
    console.log('aqaa' );

    this.activatedRoute.paramMap.subscribe((params) => {
      const recipeId = params.get('id');
      if (!recipeId) {
        return;
      }
      this.productDetailedService
        .getProductById(recipeId)
        .subscribe((product: Product) => {
          this.product = product;
          console.log(product);
        });
    });
    this.productsListService.getAllProducts().subscribe((res) => {

      console.log('res', res);
      this.products = res;

    });

  }

  countIncreased() {
    this.count++;
  }
  countDecreased() {
    this.count--;
  }
  productItemClicked(id:number){
    this.router.navigate(['detailed',id])
  }

}
