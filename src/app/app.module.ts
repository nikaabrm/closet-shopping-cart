import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { localStorageSync } from 'ngrx-store-localstorage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authReducer } from './store/auth/auth.reducer';
import { cartReducer } from './store/cart/cart.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export function localStorageSyncReducer(reducer: any) {
  return localStorageSync({
    keys: ['cart'],
    rehydrate: true
  })(reducer);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    ShoppingCartModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
      newestOnTop: true
    }),
    StoreModule.forRoot({
      auth: authReducer,
      cart: cartReducer
    }, {
      metaReducers: [localStorageSyncReducer]
    }),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [
    provideStoreDevtools({ maxAge: 25 })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
