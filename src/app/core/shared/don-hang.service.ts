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

    let newItem: ItemCartModel = { _id: item._id, ten: item.ten, ma: item.ma, donGia: item.giaBan, soLuong: soLuong, thanhTien: item.giaBan * soLuong, sanCo: item.soLuong };
    donHang.sanPhams.push(newItem);

    this.resolveDonHangLocal(donHang);
    this.saveDonHangLocal(donHang);
  }

  getLocations(): Observable<LocationModel[]> {
    return this.http.get(appConfig[this.env]['helpers']['locations'])
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
    donHang.phiVanChuyen = donHang.phiVanChuyen || 0;

    donHang.sanPhams.forEach(item => {
      donHang.itemsCount += item.soLuong;

      item.thanhTien = item.soLuong * item.donGia;
      donHang.tongCong += item.thanhTien;
    });

    donHang.tongCong += donHang.phiVanChuyen;
  }

  initDonHangLocal(): DonHangModel {
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
      itemsCount: 0,
      tongCong: 0,
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
    return this.http.post(appConfig[this.env]['apis']['don_hangs'], newDonHang)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getDonHang(donHangId: string, pager: DonHangPager = { fields: '-created' }): Observable<DonHangModel> {
    return this.http.get(appConfig[this.env]['apis']["don_hangs"] + `/${donHangId}?fields=${pager.fields}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  public get env(): string {
    return (environment.production) ? 'prod' : 'dev';
  }

  getDonHangs(pager: DonHangPager = { search: '', fields: 'created maDonHang trangThai itemsCount tongCong' }): Observable<Response> {
    return this.http.get(appConfig[this.env]['apis']["don_hangs"] + `?search=${pager.search || ''}&page=${pager.page || 1}&limit=${pager.limit || 10}&fields=${pager.fields || 'created maDonHang trangThai itemsCount tongCong'}`);
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
  itemsCount: number;
  tongCong: number;
  trangThai: string;
  ghiChu: string;

  thanhToan?: string;
  ngayGiao?: string;
  ngayDuKienGiao?: string;
  created?: string;
}

export class DonHangPager { search?: string; hoTenLatinized?: string; dienThoai?: string; email?: string; tinhThanh?: string; quanHuyen?: string; maDonHang?: string; fields?: string; page?: number; limit?: number; sort?: string }