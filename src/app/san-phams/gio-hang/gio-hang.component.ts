import { Component, OnInit, OnDestroy } from '@angular/core';

import { Location } from '@angular/common';
import { DonHangService, DonHangModel, ItemCartModel } from '../../core/shared/don-hang.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sk-gio-hang',
  templateUrl: './gio-hang.component.html',
  styleUrls: ['./gio-hang.component.scss']
})
export class GioHangComponent implements OnInit, OnDestroy {
  
  donHang: DonHangModel;
  totalPrice: number = 0;
  routeSub: Subscription;
  previousUrl: string;

  get itemsCount(): number {
    return this.donHangService.getDonHangLocal().itemsCount;
  }

  constructor(private donHangService: DonHangService, private location: Location) { }

  public get chietKhau() : number {
    return - Math.ceil((this.donHang.chietKhauPercent / 100 * this.donHang.tongCong) / 1000) * 1000;
  }

  removeItemFromCart(item: ItemCartModel) {
    this.donHang.sanPhams.splice(this.donHang.sanPhams.indexOf(item), 1);
    this.onResolveCart();    
  }

  onResolveCart() {
    this.donHangService.resolveDonHangLocal(this.donHang);
    this.donHangService.saveDonHangLocal(this.donHang);
  }

  // onGoBack() {
  //   this.location.back();
  // }

  ngOnInit() {
    this.donHang = this.donHangService.getDonHangLocal();
    this.onResolveCart();
  }

  ngOnDestroy() {
    if (this.routeSub) this.routeSub.unsubscribe();
  }

}
