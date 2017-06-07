import { Component, OnInit } from '@angular/core';

import { CartService, ItemCartModel } from '../../core/shared/cart.service';

@Component({
  selector: 'sk-thanh-toan',
  templateUrl: './thanh-toan.component.html',
  styleUrls: ['./thanh-toan.component.scss']
})
export class ThanhToanComponent implements OnInit {

  cartItems: ItemCartModel[];
  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

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
