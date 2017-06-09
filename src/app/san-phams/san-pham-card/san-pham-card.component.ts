import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SanPhamModel } from '../../core/shared/san-pham.service';
import { DonHangService } from '../../core/shared/don-hang.service';

@Component({
  selector: 'sk-san-pham-card',
  templateUrl: './san-pham-card.component.html',
  styleUrls: ['./san-pham-card.component.scss']
})
export class SanPhamCardComponent implements OnInit {

  @Input() product: SanPhamModel;
  
  constructor(private router: Router, private donHangService: DonHangService) { }

  ngOnInit() {
  }

  
  public get isHetHang() : boolean {
    return this.product && this.product.soLuong <= 0;
  }
  

  addToCart(product: SanPhamModel) {
    this.donHangService.addToCart(product, 1);
    this.router.navigate(['/gio-hang'])
  }

}
