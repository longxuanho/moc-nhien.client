import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../../environments/environment';

import { appConfig } from './app-config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CartService {

  constructor(private http: Http) { }


  getCart(): ItemCartModel[] {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  addToCart(item, soLuong: number) {
    if (!item || !soLuong) return;
    let cart = this.getCart();

    // Nếu item đã tồn tại trong giỏ hàng, return;
    if (cart.find(itemInCart => itemInCart._id === item._id)) return;
    
    let newItem: ItemCartModel = { _id: item._id, ten: item.ten, ma: item.ma, donGia: item.giaBan, soLuong: soLuong, thanhTien: item.giaBan * soLuong, sanCo: item.soLuong };
    cart.push(newItem);

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  saveCart(cart: ItemCartModel[]) {
    if (!cart) return;

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  resetCart() {
    localStorage.removeItem('cart');
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

export class DonHangModel {
  _id?: string;

  khachHang: {
    hoTen: string;
    dienThoai: string;
    email: string;
    diaChi: string;
    tinhThanh: string;
    quanHuyen: string;
  };
  cachThanhToan: string;
  sanPhams: ItemCartModel[];
  tongCong: number;
  trangThai: string;

  ngayGiao?: string;
  ngayDuKienGiao?: string;
  created?: string;
}