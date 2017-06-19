import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { SanPhamModel } from '../../core/shared/san-pham.service';
import { DonHangService } from '../../core/shared/don-hang.service';

@Component({
  selector: 'sk-san-pham-card',
  templateUrl: './san-pham-card.component.html',
  styleUrls: ['./san-pham-card.component.scss']
})
export class SanPhamCardComponent implements OnInit {

  @Input() product: SanPhamModel;
  @Output() cardEvents = new EventEmitter<{ message: string, data: any }>();
  
  constructor(private donHangService: DonHangService) { }

  ngOnInit() {
  }

  public get isHetHang() : boolean {
    return this.product && this.product.soLuong <= 0;
  }

  public get isItemInCart() : boolean {
    return this.product && this.donHangService.isItemInCart(this.product._id);
  }

  addToCart(product: SanPhamModel) {
    this.cardEvents.emit({ message: 'onAddToCard', data: product });
  }

}
