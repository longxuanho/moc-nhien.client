import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { DonHangService } from '../../core/shared/don-hang.service';
import { SanPhamService, SanPhamModel } from '../../core/shared/san-pham.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sk-san-pham-details',
  templateUrl: './san-pham-details.component.html',
  styleUrls: ['./san-pham-details.component.scss']
})
export class SanPhamDetailsComponent implements OnInit, OnDestroy {

  product: SanPhamModel;
  routeSub: Subscription;
  currentCoverUrl: string;
  currentCoverIndex: number;

  constructor(
    private sanPhamService: SanPhamService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private donHangService: DonHangService) { }

  handleError(error) {
    console.log(error);
  }

  setCurrentCoverUrl(event: Event, index: number = 0) {
    event.preventDefault();
    if (this.product && this.product.gallery && this.product.gallery[index])
      this.currentCoverUrl = this.product.gallery[index].url || '';
    this.currentCoverIndex = index;
  }

  addToCart(product: SanPhamModel) {
    this.donHangService.addToCart(product, 1);
    this.router.navigate(['/gio-hang'])
  }

  public get isHetHang() : boolean {
    return this.product && this.product.soLuong <= 0;
  }

  ngOnInit() {
    this.routeSub = this.route.params
      .switchMap((params: Params) => this.sanPhamService.getSanPham(params["id"], { fields: '-created' }))
      .subscribe(sanPham => {
        console.log(sanPham);
        this.product = sanPham;
        this.currentCoverIndex = 0;
        this.currentCoverUrl = (this.product && this.product.gallery && this.product.gallery) ? this.product.gallery[0].url : '';
      }, error => this.handleError(error))
  }

  ngOnDestroy() {
    if (this.routeSub) this.routeSub.unsubscribe();
  }

}
