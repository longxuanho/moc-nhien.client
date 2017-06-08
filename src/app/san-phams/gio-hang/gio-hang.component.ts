import { Component, OnInit } from '@angular/core';
import { DonHangService, DonHangModel, ItemCartModel } from '../../core/shared/don-hang.service';

@Component({
  selector: 'sk-gio-hang',
  templateUrl: './gio-hang.component.html',
  styleUrls: ['./gio-hang.component.scss']
})
export class GioHangComponent implements OnInit {
  
  donHang: DonHangModel;
  cartItems: ItemCartModel[];
  totalPrice: number = 0;

  constructor(private donHangService: DonHangService) { }

  removeItemFromCart(item: ItemCartModel) {
    this.cartItems.splice(this.cartItems.indexOf(item), 1);
    this.onResolveCart();    
  }

  onResolveCart() {
    this.donHangService.resolveDonHang(this.donHang);
    this.donHangService.saveDonHang(this.donHang);
  }

  ngOnInit() {
    this.donHang = this.donHangService.getDonHang();
    this.cartItems = this.donHang.sanPhams;
    this.onResolveCart();
  }

}
