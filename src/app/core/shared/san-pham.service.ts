import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { environment } from '../../../environments/environment';

import { appConfig } from './app-config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SanPhamService {

  constructor(private http: Http) { }

  getSanPham(sanPhamId: string, pager: { fields: '' }) {
    return this.http.get(appConfig[this.env]['api']["san_phams"] + `/${sanPhamId}?fields=${pager.fields}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getProductGallery(productId: string) {
    // return this.af.database.list(`${this.resolveProductGalleryRef()}/${productId}`)
    //     .take(1);
  }

  getProductArticles(productId: string) {
    // return this.af.database.object(`${this.resolveProductArticlesRef()}/${productId}`)
    //     .take(1);
  }

  getSanPhams(pager: SanPhamPager = {}): Observable<SanPhamModel[]> {
    return this.http.get(appConfig[this.env]['apis']["san_phams"] + `?nhom=${pager.nhom || ''}&status=${pager.status || ''}&tags=${pager.tags || ''}&search=${pager.search || ''}&fields=${pager.fields || ''}&page=${pager.page || 1}&limit=${pager.limit || 10}&sort=${pager.sort || 'ten'}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  getPinnedItems() {
    // let query = {
    //     orderByChild: 'isPinned',
    //     equalTo: true
    // };
    // return this.af.database.list(`${this.resolveProductRef()}`, { query })
    //     .take(1);
  }

  getBestSellers() {
    // let query = {
    //     orderByChild: 'isBestSeller',
    //     equalTo: true
    // };
    // return this.af.database.list(`${this.resolveProductRef()}`, { query })
    //     .take(1);
  }

  getNewReleases() {
    // let query = {
    //     orderByChild: 'isNewRelease',
    //     equalTo: true
    // };
    // return this.af.database.list(`${this.resolveProductRef()}`, { query })
    //     .take(1);
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