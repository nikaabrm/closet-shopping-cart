import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailedService } from './product-detailed.service';
import { Product } from '../models/product.model';
import { Store } from '@ngrx/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, Subscription, take } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../modals/login/login.component';
import * as AuthSelectors from '../../store/auth/auth.selectors';
import * as CartActions from '../../store/cart/cart.actions';
import { ToastrService } from 'ngx-toastr';
import { ProductsListService } from '../products-list/products-list.service';

@Component({
  selector: 'app-product-detailed',
  standalone: false,
  templateUrl: './product-detailed.component.html',
  styleUrl: './product-detailed.component.scss',
})
export class ProductDetailedComponent implements OnDestroy {
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
    navText: [
      '<i class="bi bi-chevron-left fs-5 text-body-emphasis"></i>',
      '<i class="bi bi-chevron-right fs-5 text-body-emphasis"></i>',
    ],
  };

  product: Product;
  count = 1;
  products: Product[];

  isAuthenticated$: Observable<boolean>;
  private dialogRef: MatDialogRef<LoginComponent> | null = null;
  private authSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productDetailedService: ProductDetailedService,
    private productListService: ProductsListService,
    private store: Store,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.isAuthenticated$ = this.store.select(
      AuthSelectors.selectIsAuthenticated
    );

    // Subscribe to auth state changes to close dialog when authenticated
    this.authSubscription = this.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        if (isAuthenticated && this.dialogRef) {
          this.dialogRef.close();
          this.dialogRef = null;
          // Now that we're authenticated, we can proceed with adding to cart
          this.proceedWithAddToCart();
        }
      }
    );

    this.activatedRoute.paramMap.subscribe((params) => {
      const recipeId = params.get('id');

      if (!recipeId) {
        return;
      }

      this.productDetailedService
        .getProductById(recipeId)
        .subscribe((product: Product) => {
          this.product = product;
        });
      this.productListService.getAllProducts().subscribe((res) => {
        this.products = res;
      });
    });
  }

  countIncreased() {
    this.count++;
  }

  countDecreased() {
    if (this.count > 1) {
      this.count--;
    }
  }

  addToCart() {
    this.isAuthenticated$.pipe(take(1)).subscribe((isAuthenticated) => {
      if (!isAuthenticated) {
        this.openLoginModal();
      } else {
        this.proceedWithAddToCart();
      }
    });
  }

  private openLoginModal() {
    this.dialogRef = this.dialog.open(LoginComponent);
  }

  private proceedWithAddToCart() {
    this.store.dispatch(
      CartActions.addToCart({
        item: {
          product: this.product,
          quantity: this.count,
        },
      })
    );

    this.toastr.success(
      `Added ${this.count} item${this.count > 1 ? 's' : ''} to cart`,
      this.product.title,
      {
        positionClass: 'toast-top-right',
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
      }
    );
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  productItemClicked(id: number) {
    this.router.navigate(['detailed', id]);
  }
}
