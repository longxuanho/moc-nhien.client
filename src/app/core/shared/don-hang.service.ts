import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../../environments/environment';

import { appConfig } from './app-config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DonHangService {

  constructor(private http: Http) { }

  addToCart(item, soLuong: number) {
    if (!item || !soLuong) return;

    let donHang = this.getDonHang();
    let cart = donHang.sanPhams;

    // Nếu item đã tồn tại trong giỏ hàng, return;
    if (cart.find(itemInCart => itemInCart._id === item._id)) return;

    let newItem: ItemCartModel = { _id: item._id, ten: item.ten, ma: item.ma, donGia: item.giaBan, soLuong: soLuong, thanhTien: item.giaBan * soLuong, sanCo: item.soLuong };
    cart.push(newItem);

    this.saveDonHang(donHang);
  }

  getLocations(): Observable<LocationModel[]> {
    return this.http.get(appConfig[this.env]['helpers']['locations'])
      .map(res => res.json()['locations']);
  }

  getDonHang(): DonHangModel {
    return <DonHangModel>JSON.parse(localStorage.getItem('donHang')) || this.initDonHang();
  }

  saveDonHang(donHang: DonHangModel) {
    if (!donHang) return;

    localStorage.setItem('donHang', JSON.stringify(donHang));
  }

  resetDonHang() {
    localStorage.removeItem('donHang');
  }

  resolveDonHang(donHang: DonHangModel) {
    if (!donHang || !donHang.sanPhams) return;

    donHang.tongCong = 0;
    donHang.phiVanChuyen = donHang.phiVanChuyen || 0;
    donHang.sanPhams.forEach(item => {
      item.thanhTien = item.soLuong * item.donGia;
      donHang.tongCong += item.thanhTien;
    });

    donHang.tongCong += donHang.phiVanChuyen;
  }

  resetCart() {
    localStorage.removeItem('cart');
  }

  initDonHang(): DonHangModel {
    return {
      hoTen: '',
      dienThoai: '',
      email: '',
      diaChi: '',
      tinhThanh: '',
      quanHuyen: '',

      cachThanhToan: 'Tiền mặt',
      ghiChu: '',
      sanPhams: [],
      phiVanChuyen: 0,
      tongCong: 0,
      trangThai: 'Chờ kiểm duyệt'
    }
  }

  public get env(): string {
    return (environment.production) ? 'prod' : 'dev';
  }


  handleError(error: any) {
    console.log(error);

    if (error instanceof Response) {
      let errMessage = '';
      try {
        errMessage = error.json().error;
      }
      catch (err) {
        errMessage = error.statusText;
      }
      return Observable.throw(errMessage);
    }

    return Observable.throw(error || 'Server error');
  }

}

export class ItemCartModel {
  _id: string;
  ma: string;
  ten: string;
  soLuong: number;
  donGia: number;
  sanCo: number;
  thanhTien?: number;
}

export class LocationModel {
  tinhThanh: string;
  quanHuyen: string;
  phiVanChuyen: number;
}

export class DonHangModel {
  _id?: string;

  hoTen: string;
  dienThoai: string;
  email: string;
  diaChi: string;
  tinhThanh: string;
  quanHuyen: string;

  cachThanhToan: string;
  sanPhams: ItemCartModel[];
  phiVanChuyen: number;
  tongCong: number;
  trangThai: string;
  ghiChu: string;

  ngayGiao?: string;
  ngayDuKienGiao?: string;
  created?: string;
}