import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { DonHangService } from '../../core/shared/don-hang.service';
import { SanPhamModel } from '../../core/shared/san-pham.service';

declare const UIkit: any;


@Component({
  selector: 'sk-add-to-cart-modal',
  templateUrl: './add-to-cart-modal.component.html',
  styleUrls: ['./add-to-cart-modal.component.scss']
})
export class AddToCartModalComponent implements OnInit {

  product: SanPhamModel;

  @ViewChild('modal') modalRef: ElementRef;

  constructor(private donHangService: DonHangService) { }

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

}
