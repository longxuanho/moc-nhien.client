import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { DonHangService, DonHangModel, ItemCartModel } from '../../core/shared/don-hang.service';

@Component({
  selector: 'sk-thanh-toan',
  templateUrl: './thanh-toan.component.html',
  styleUrls: ['./thanh-toan.component.scss']
})
export class ThanhToanComponent implements OnInit {

  donHang: DonHangModel;

  cartItems: ItemCartModel[];
  totalPrice: number = 0;
  donHangForm: FormGroup;


  constructor(private donHangService: DonHangService) {}

  onResolveCart() {
    this.totalPrice = 0;
    this.cartItems.forEach(item => {
      item.thanhTien = item.soLuong * item.donGia;
      this.totalPrice += item.thanhTien;
    });
    this.donHangService.saveDonHang(this.donHang);
  }

  ngOnInit() {
    this.donHang = this.donHangService.getDonHang();
    this.cartItems = this.donHang.sanPhams;
    this.onResolveCart();
  }

}
