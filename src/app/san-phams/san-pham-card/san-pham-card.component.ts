import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SanPhamModel } from '../../core/shared/san-pham.service';
import { CartService } from '../../core/shared/cart.service';

@Component({
  selector: 'sk-san-pham-card',
  templateUrl: './san-pham-card.component.html',
  styleUrls: ['./san-pham-card.component.scss']
})
export class SanPhamCardComponent implements OnInit {

  @Input() product: SanPhamModel;
  
  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit() {
  }

  addToCart(product: SanPhamModel) {
    this.cartService.addToCart(product, 1);
    this.router.navigate(['/gio-hang'])
  }

}
