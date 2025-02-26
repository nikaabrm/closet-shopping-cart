import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart.component';
import { HeaderComponent } from './header/header.component';
import { CategoriesComponent } from './categories/categories.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HighlightsComponent } from './highlights/highlights.component';
import { SpringCollectionsComponent } from './spring-collections/spring-collections.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    ShoppingCartComponent,
    HeaderComponent,
    HighlightsComponent,
    SpringCollectionsComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    CategoriesComponent,
    CarouselModule
  ],
  exports: [
    ShoppingCartComponent
  ]
})
export class ShoppingCartModule { }
