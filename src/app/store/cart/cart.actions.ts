import { createAction, props } from '@ngrx/store';
import { Product } from '../../shopping-cart/models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

export const addToCart = createAction(
  '[Cart] Add Item',
  props<{ item: CartItem }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove Item',
  props<{ productId: number }>()
);

export const updateQuantity = createAction(
  '[Cart] Update Quantity',
  props<{ productId: number; quantity: number }>()
); 

export const clearCart = createAction('[Cart] Clear Cart'); 