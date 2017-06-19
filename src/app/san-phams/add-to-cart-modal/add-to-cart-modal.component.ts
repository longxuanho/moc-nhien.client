import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

import { DonHangService } from '../../core/shared/don-hang.service';
import { SanPhamModel } from '../../core/shared/san-pham.service';
import { LoggerService } from '../../core/shared/logger.service';


declare const UIkit: any;

@Component({
  selector: 'sk-add-to-cart-modal',
  templateUrl: './add-to-cart-modal.component.html',
  styleUrls: ['./add-to-cart-modal.component.scss']
})
export class AddToCartModalComponent implements OnInit {

  product: SanPhamModel;
  @ViewChild('modal') modalRef: ElementRef;

  constructor(private donHangService: DonHangService, private loggerService: LoggerService) { }

  ngOnInit() {
  }

  setProduct(product: SanPhamModel) {
    this.product = product;
  }

  clearProduct() {
    this.product = null;
  }

  show() {
    UIkit.modal(this.modalRef.nativeElement).show();
  }

  hide() {
    UIkit.modal(this.modalRef.nativeElement).hide();
  }

  addToCart(form: NgForm) {
    if (!this.product || !form.value || !form.value["soLuong"]) return;

    this.donHangService.addToCart(this.product, form.value["soLuong"]);
    this.loggerService.success(`Sản phẩm ${ this.product.ten } (${ this.product.ma }) đã được thêm vào giỏ hàng của bạn.`, 'Giỏ hàng được cập nhật');

    this.clearProduct();
    this.hide();
  }

}
