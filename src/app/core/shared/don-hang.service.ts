import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../../environments/environment';

import { appConfig } from './app-config';
import { Subject }    from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DonHangService {

  private itemsCountLocalChangedSource = new Subject<number>();
  itemsCountLocalChanged$ = this.itemsCountLocalChangedSource.asObservable();

  constructor(private http: Http) { }

  // **********************************************
  // DonHangLocal
  // **********************************************

  addToCart(item, soLuong: number) {
    if (!item || !soLuong) return;

    let donHang = this.getDonHangLocal();

    // Nếu item đã tồn tại trong giỏ hàng, return;
    if (donHang.sanPhams.find(itemInCart => itemInCart._id === item._id)) return;

    let newItem: ItemCartModel = { _id: item._id, ten: item.ten, ma: item.ma, cover: item.cover, donGia: item.giaBan, soLuong: soLuong, thanhTien: item.giaBan * soLuong, sanCo: item.soLuong };
    donHang.sanPhams.push(newItem);

    this.resolveDonHangLocal(donHang);
    this.saveDonHangLocal(donHang);
  }

  isItemInCart(itemId: string) {
    return this.getDonHangLocal().sanPhams.findIndex((sanPham => sanPham._id === itemId)) >= 0
  }

  getLocations(): Observable<LocationModel[]> {
    return this.http.get(environment.helpers.locations)
      .map(res => res.json()['locations']);
  }

  getItemsCountLocal(): number {
    return this.getDonHangLocal().sanPhams.length;
  }

  getDonHangLocal(): DonHangModel {
    return <DonHangModel>JSON.parse(localStorage.getItem('donHang')) || this.initDonHangLocal();
  }

  saveDonHangLocal(donHang: DonHangModel) {
    if (!donHang) return;

    localStorage.setItem('donHang', JSON.stringify(donHang));

    // Thông báo cho các component đang subscribe về lượng hàng trong giỏ hàng thay đổi.
    this.onChangeItemsCountLocal(donHang.sanPhams.length);
  }

  resetDonHangLocal() {
    localStorage.removeItem('donHang');

    // Thông báo cho các component đang subscribe về lượng hàng trong giỏ hàng thay đổi.
    this.onChangeItemsCountLocal(0);
  }

  resolveDonHangLocal(donHang: DonHangModel) {
    if (!donHang || !donHang.sanPhams) return;

    donHang.itemsCount = 0;
    donHang.tongCong = 0;
    donHang.chietKhauPercent = 0;
    donHang.tongThanhToan = 0;
    donHang.phiVanChuyen = donHang.phiVanChuyen || 0;

    donHang.sanPhams.forEach(item => {
      donHang.itemsCount += item.soLuong;

      item.thanhTien = item.soLuong * item.donGia;
      donHang.tongCong += item.thanhTien;
    });

    if (donHang.itemsCount >= 2688) donHang.chietKhauPercent = 42;
    else if (donHang.itemsCount >= 1344) donHang.chietKhauPercent = 33;
    else if (donHang.itemsCount >= 672) donHang.chietKhauPercent = 25;
    else if (donHang.itemsCount >= 336) donHang.chietKhauPercent = 18;
    else if (donHang.itemsCount >= 168) donHang.chietKhauPercent = 12;
    else if (donHang.itemsCount >= 84) donHang.chietKhauPercent = 7;
    else if (donHang.itemsCount >= 42) donHang.chietKhauPercent = 3;
    else donHang.chietKhauPercent = 0;

    let chietKhau = - Math.ceil((donHang.chietKhauPercent / 100 * donHang.tongCong) / 1000) * 1000; 
    
    donHang.tongThanhToan = donHang.tongCong + chietKhau + donHang.phiVanChuyen;
  }

  initDonHangLocal(): DonHangModel {
    return {
      hoTen: '',
      dienThoai: '',
      email: '',
      isThongTinGiaoHangKhacThongTinThanhToan: false,
      hoTenNguoiNhan: '',
      dienThoaiNguoiNhan: '',
      diaChi: '',
      tinhThanh: '',
      quanHuyen: '',

      cachThanhToan: 'Tiền mặt',
      ghiChu: '',
      sanPhams: [],
      phiVanChuyen: 0,
      itemsCount: 0,
      tongCong: 0,
      chietKhauPercent: 0,
      tongThanhToan: 0,
      trangThai: 'Chờ xác thực'
    }
  }

  onChangeItemsCountLocal(newVal: number) {
    this.itemsCountLocalChangedSource.next(newVal);
  }

  // **********************************************
  // DonHangFromServer
  // **********************************************

  createNewDonHang(newDonHang: DonHangModel) {
    return this.http.post(environment.apis.don_hangs, newDonHang)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getDonHang(donHangId: string, pager: DonHangPager = { fields: '-created' }): Observable<DonHangModel> {
    return this.http.get(environment.apis.don_hangs + `/${donHangId}?fields=${pager.fields}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  public get env(): string {
    return (environment.production) ? 'prod' : 'dev';
  }

  getDonHangs(pager: DonHangPager = { search: '', fields: 'created maDonHang trangThai itemsCount tongCong' }): Observable<Response> {
    return this.http.get(environment.apis.don_hangs + `?search=${pager.search || ''}&page=${pager.page || 1}&limit=${pager.limit || 10}&fields=${pager.fields || 'created maDonHang trangThai itemsCount tongCong'}`);
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
  cover?: string;
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
  isThongTinGiaoHangKhacThongTinThanhToan: boolean;
  hoTenNguoiNhan: string;
  dienThoaiNguoiNhan: string;
  diaChi: string;
  tinhThanh: string;
  quanHuyen: string;

  cachThanhToan: string;
  sanPhams: ItemCartModel[];
  phiVanChuyen: number;
  itemsCount: number;
  tongCong: number;
  chietKhauPercent: number;
  tongThanhToan: number;
  trangThai: string;
  ghiChu: string;

  daThanhToan?: string;
  ngayGiao?: string;
  ngayDuKienGiao?: string;
  created?: string;
}

export class DonHangPager { search?: string; hoTenLatinized?: string; dienThoai?: string; email?: string; tinhThanh?: string; quanHuyen?: string; maDonHang?: string; fields?: string; page?: number; limit?: number; sort?: string }