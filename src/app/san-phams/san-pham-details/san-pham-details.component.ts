import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { DonHangService } from '../../core/shared/don-hang.service';
import { SanPhamService, SanPhamModel } from '../../core/shared/san-pham.service';
import { LoggerService } from '../../core/shared/logger.service';
import { AddToCartModalComponent } from '../add-to-cart-modal/add-to-cart-modal.component';

import { Subscription } from 'rxjs/Subscription';

declare const $: any;
declare const UIkit: any;

@Component({
  selector: 'sk-san-pham-details',
  templateUrl: './san-pham-details.component.html',
  styleUrls: ['./san-pham-details.component.scss']
})
export class SanPhamDetailsComponent implements OnInit, OnDestroy {

  @ViewChild(AddToCartModalComponent) addToCartModalComponent: AddToCartModalComponent;

  product: SanPhamModel;
  routeSub: Subscription;
  currentCoverUrl: string;
  currentCoverIndex: number;

  constructor(
    private sanPhamService: SanPhamService,
    private route: ActivatedRoute,
    private router: Router,
    private donHangService: DonHangService,
    private loggerService: LoggerService) { }

  handleError(error) {
    console.log(error);
  }

  public get isItemInCart(): boolean {
    return this.product && this.donHangService.isItemInCart(this.product._id);
  }

  showGalleryModal() {
    UIkit.modal("#modal-center").show();
  }

  setCurrentCoverUrl(event: Event, index: number = 0) {
    event.preventDefault();
    if (this.product && this.product.gallery && this.product.gallery[index])
      this.currentCoverUrl = this.product.gallery[index].url || '';
    this.currentCoverIndex = index;
  }

  nextCover() {
    if (!this.product || !this.product.gallery || !this.product.gallery.length)
      return;

    if (this.currentCoverIndex >= this.product.gallery.length - 1) {
      this.currentCoverIndex = 0;
    } else {
      this.currentCoverIndex++;
    }

    this.currentCoverUrl = this.product.gallery[this.currentCoverIndex].url || '';
  };

  prevCover() {
    if (!this.product || !this.product.gallery || !this.product.gallery.length)
      return;

    if (this.currentCoverIndex <= 0) {
      this.currentCoverIndex = this.product.gallery.length - 1;
    } else {
      this.currentCoverIndex--;
    }

    this.currentCoverUrl = this.product.gallery[this.currentCoverIndex].url || '';
  };

  addToCart(product: SanPhamModel) {

    if (!this.product || !this.addToCartModalComponent) return;

    this.addToCartModalComponent.setProduct(this.product);
    this.addToCartModalComponent.show();
  }

  public get isHetHang(): boolean {
    return this.product && this.product.soLuong <= 0;
  }

  ngOnInit() {
    this.routeSub = this.route.params
      .switchMap((params: Params) => this.sanPhamService.getSanPham(params["id"], { fields: '-created' }))
      .subscribe(sanPham => {
        if (!sanPham) this.loggerService.error('Không tìm thấy sản phẩm hoặc sản phẩm không tồn tại!', 'Không tìm thấy sản phẩm');
        
        this.product = sanPham;
        this.currentCoverIndex = 0;
        this.currentCoverUrl = (this.product && this.product.gallery && this.product.gallery) ? this.product.gallery[0].url : '';
      }, error => this.handleError(error))
  }

  ngOnDestroy() {
    if (this.routeSub) this.routeSub.unsubscribe();
  }

}
