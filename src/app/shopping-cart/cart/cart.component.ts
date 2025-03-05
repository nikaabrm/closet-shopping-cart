import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  photoUrl = 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg';
  count = 0;
  countIncreased(){
    this.count++
  }
  countDecreased(){
    this.count--
  }

}
