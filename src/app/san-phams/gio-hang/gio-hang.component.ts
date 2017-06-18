import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DonHangService, DonHangModel, ItemCartModel } from '../../core/shared/don-hang.service';

@Component({
  selector: 'sk-gio-hang',
  templateUrl: './gio-hang.component.html',
  styleUrls: ['./gio-hang.component.scss']
})
export class GioHangComponent implements OnInit {
  
  donHang: DonHangModel;
  totalPrice: number = 0;

  constructor(private donHangService: DonHangService, private location: Location) { }

  removeItemFromCart(item: ItemCartModel) {
    this.donHang.sanPhams.splice(this.donHang.sanPhams.indexOf(item), 1);
    this.onResolveCart();    
  }

  onResolveCart() {
    this.donHangService.resolveDonHangLocal(this.donHang);
    this.donHangService.saveDonHangLocal(this.donHang);
  }

  onGoBack() {
    this.location.back();
  }

  ngOnInit() {
    this.donHang = this.donHangService.getDonHangLocal();
    this.onResolveCart();
  }

}
