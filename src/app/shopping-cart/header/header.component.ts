import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../modals/login/login.component';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly dialog = inject(MatDialog);

  openLoginDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '500px',
    });
  }
 
}
