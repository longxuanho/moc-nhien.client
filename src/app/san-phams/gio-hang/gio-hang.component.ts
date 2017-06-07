import { Component, OnInit } from '@angular/core';
import { CartService, ItemCartModel } from '../../core/shared/cart.service';

@Component({
  selector: 'sk-gio-hang',
  templateUrl: './gio-hang.component.html',
  styleUrls: ['./gio-hang.component.scss']
})
export class GioHangComponent implements OnInit {

  cartItems: ItemCartModel[];

  constructor(private cartService: CartService) { }

  removeItemFromCart(item: ItemCartModel) {
    console.log(this.cartItems.indexOf(item), item);
    this.cartItems.splice(this.cartItems.indexOf(item), 1);
    console.log(this.cartItems);
    this.cartService.saveCart(this.cartItems);
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
    console.log(this.cartItems);
  }

}
