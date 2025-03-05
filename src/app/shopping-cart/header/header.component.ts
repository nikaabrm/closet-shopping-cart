import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../modals/login/login.component';
import * as AuthSelectors from '../../store/auth/auth.selectors';
import * as AuthActions from '../../store/auth/auth.actions';
import * as CartSelectors from '../../store/cart/cart.selectors';
import { UserInfo } from '../../common/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnDestroy {
  isAuthenticated$: Observable<boolean>;
  user$: Observable<UserInfo | null>;
  cartItemsCount$: Observable<number>;
  private dialogRef: MatDialogRef<LoginComponent> | null = null;
  private readonly authSubscription: Subscription;

  constructor(private store: Store, private dialog: MatDialog) {
    this.isAuthenticated$ = this.store.select(
      AuthSelectors.selectIsAuthenticated
    );
    this.user$ = this.store.select(AuthSelectors.selectUser);
    this.cartItemsCount$ = this.store.select(
      CartSelectors.selectCartItemsCount
    );

    // Subscribe to auth state changes to close dialog when authenticated
    this.authSubscription = this.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        if (isAuthenticated && this.dialogRef) {
          this.dialogRef.close();
          this.dialogRef = null;
        }
      }
    );
  }

  openLoginDialog(): void {
    this.isAuthenticated$.pipe(take(1)).subscribe((isAuthenticated) => {
      if (!isAuthenticated) {
        this.dialogRef = this.dialog.open(LoginComponent);
      }
    });
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
