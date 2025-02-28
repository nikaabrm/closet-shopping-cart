import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsListComponent } from './shopping-cart/products-list/products-list.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
