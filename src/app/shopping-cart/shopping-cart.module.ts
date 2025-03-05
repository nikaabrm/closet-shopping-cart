import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart.component';
import { HeaderComponent } from './header/header.component';
import { CategoriesComponent } from './categories/categories.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HighlightsComponent } from './highlights/highlights.component';
import { SpringCollectionsComponent } from './spring-collections/spring-collections.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { RouterModule } from '@angular/router';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { ProductDetailedComponent } from './product-detailed/product-detailed.component';
import { CartComponent } from './cart/cart.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './modals/login/login.component';
import { PricePipe } from '../common/pipes/price.pipe';

@NgModule({
  declarations: [
    ShoppingCartComponent,
    HeaderComponent,
    HighlightsComponent,
    SpringCollectionsComponent,
    FooterComponent,
    ProductsListComponent,
    ProductListItemComponent,
    ProductDetailedComponent,
    CartComponent,
    FavoritesComponent,
    LoginComponent,
    LoginComponent,
    CategoriesComponent,
    
  ],
  imports: [
    CommonModule,
    CarouselModule,
    RouterModule,
    NgxSliderModule,
    FormsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    PricePipe
  ],
  exports: [ShoppingCartComponent, HeaderComponent, FooterComponent],
})
export class ShoppingCartModule {}
