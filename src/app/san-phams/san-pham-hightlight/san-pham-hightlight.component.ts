import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { AddToCartModalComponent } from '../add-to-cart-modal/add-to-cart-modal.component';


@Component({
  selector: 'sk-san-pham-hightlight',
  templateUrl: './san-pham-hightlight.component.html',
  styleUrls: ['./san-pham-hightlight.component.scss']
})
export class SanPhamHightlightComponent implements OnInit {

  @Input() products: [any];
  @Input() category: string;
  @ViewChild(AddToCartModalComponent) addToCartModalComponent: AddToCartModalComponent;

  handleCardEvents(event: { message: string, data: any }) {
    switch (event.message) {
      case 'onAddToCard':
        if (!this.addToCartModalComponent) break;

        this.addToCartModalComponent.setProduct(event.data);
        this.addToCartModalComponent.show();
        break;
      default:
        break;
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
