import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import * as AuthActions from '../auth/auth.actions';
import { CartItem } from './cart.actions';

export interface CartState {
  items: CartItem[];
}

export const initialState: CartState = {
  items: []
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCart, (state, { item }) => {
    const existingItemIndex = state.items.findIndex(
      existingItem => existingItem.product.id === item.product.id
    );

    if (existingItemIndex > -1) {
      // Item exists, update quantity
      const updatedItems = [...state.items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + item.quantity
      };
      return {
        ...state,
        items: updatedItems
      };
    } else {
      // New item, add to cart
      return {
        ...state,
        items: [...state.items, item]
      };
    }
  }),
  on(CartActions.removeFromCart, (state, { productId }) => ({
    ...state,
    items: state.items.filter(item => item.product.id !== productId)
  })),
  on(CartActions.updateQuantity, (state, { productId, quantity }) => ({
    ...state,
    items: state.items.map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    )
  })),
  on(CartActions.clearCart, () => ({
    ...initialState
  })),
  on(AuthActions.logout, () => initialState)
); 