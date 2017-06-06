import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../../environments/environment';

import { appConfig } from './app-config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SanPhamService {

  constructor(private http: Http) { }

  getSanPham(sanPhamId: string, pager: { fields: '' }) {
    return this.http.get(appConfig[this.env]['apis']["san_phams"] + `/${sanPhamId}?fields=${pager.fields}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getSanPhams(pager: SanPhamPager = {}): Observable<Response> {
    return this.http.get(appConfig[this.env]['apis']["san_phams"] + `?nhom=${pager.nhom || ''}&status=${pager.status || ''}&tags=${pager.tags || ''}&search=${pager.search || ''}&fields=${pager.fields || ''}&page=${pager.page || 1}&limit=${pager.limit || 10}&sort=${pager.sort || 'ten'}`)
      .catch(this.handleError);
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

export class SanPhamModel {
  _id: string;
  nhom: string;
  ten: string;
  tenKhac: string;
  ma: string;
  giaBan: number;
  soLuong: number;
  dvt: string;
  cover: string;
  trichDan: string;
  keywords: string;
  chieuCao: string;
  gioiThieu: string;
  moTaSanPham: string;
  cachChamSoc: string;
  gallery: [{ url: string }];
  tags: [string];     // Bán chạy, Mới, Ghim
  created: string;
}

export class SanPhamPager { nhom?: string; status?: string; tags?: string; search?: string; fields?: string; page?: number; limit?: number; sort?: string }