import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsListComponent } from './shopping-cart/products-list/products-list.component';
import { ProductDetailedComponent } from './shopping-cart/product-detailed/product-detailed.component';
import { CartComponent } from './shopping-cart/cart/cart.component';
import { FavoritesComponent } from './shopping-cart/favorites/favorites.component';

export const routes: Routes = [
  {
    path:'',
    component: ShoppingCartComponent,
    pathMatch:'full'
  },
  {
    path:'products',
    component: ProductsListComponent,
    pathMatch:'full'
  },
  {
    path:'detailed/:id',
    component: ProductDetailedComponent,
    pathMatch:'full'
  },
  {
    path:'cart',
    component:CartComponent,
    pathMatch: 'full'
  },
  {
    path:'favorites',
    component:FavoritesComponent,
    pathMatch: 'full'
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
