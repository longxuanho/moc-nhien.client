import { Component, OnInit } from '@angular/core';
import { CartService, ItemCartModel } from '../../core/shared/cart.service';

@Component({
  selector: 'sk-gio-hang',
  templateUrl: './gio-hang.component.html',
  styleUrls: ['./gio-hang.component.scss']
})
export class GioHangComponent implements OnInit {

  cartItems: ItemCartModel[];
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

  removeItemFromCart(item: ItemCartModel) {
    this.cartItems.splice(this.cartItems.indexOf(item), 1);
    this.onResolveCart();    
  }

  onResolveCart() {
    this.totalPrice = 0;
    this.cartItems.forEach(item => {
      item.thanhTien = item.soLuong * item.donGia;
      this.totalPrice += item.thanhTien;
    });
    this.cartService.saveCart(this.cartItems);
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
    this.onResolveCart();
  }

}
