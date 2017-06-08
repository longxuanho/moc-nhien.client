import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { DonHangService, DonHangModel } from '../../core/shared/don-hang.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sk-don-hang-details',
  templateUrl: './don-hang-details.component.html',
  styleUrls: ['./don-hang-details.component.scss']
})
export class DonHangDetailsComponent implements OnInit, OnDestroy {

  routeSub: Subscription;
  donHang: DonHangModel;

  constructor(private donHangService: DonHangService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSub = this.route.params
      .switchMap((params: Params) => this.donHangService.getDonHang(params["id"], { fields: '-created' }))
      .subscribe(donHang => {
        this.donHang = donHang;
      }, error => this.handleError(error))
  }
  
  public get diaChiNhanHang() : string {
    return this.donHang ? `${ this.donHang.diaChi }, ${ this.donHang.quanHuyen }, ${ this.donHang.tinhThanh }.` : '';
  }

  public get trangThai() : string {
    if (!this.donHang) return '';

    if (!this.donHang.thanhToan) return 'Đơn hàng chưa thanh toán.';

    return `Đã thanh toán ${ this.donHang.thanhToan } đ.`;
  }

  public get ngayGiao() : string {
    if (!this.donHang) return '';

    if (!this.donHang.ngayDuKienGiao) return `Chưa dự kiến ngày giao.`;

    if (!this.donHang.ngayGiao) return `Dự kiến giao hàng ngày ${ this.donHang.ngayDuKienGiao }.`;

    return `Đã giao hàng ngày ${ this.donHang.ngayGiao }.`;
  }

  public get cachThanhToan() : string {
    return (this.donHang.cachThanhToan === 'Tiền mặt') ? 'Thanh toán tiền mặt khi nhận hàng.' : 'Chuyển khoản qua ngân hàng.'
  }

  

  handleError(error) {
    console.log(error);
  }

  ngOnDestroy() {
    if (this.routeSub) this.routeSub.unsubscribe();
  }
}


