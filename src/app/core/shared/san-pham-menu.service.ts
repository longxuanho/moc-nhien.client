import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';

import { appConfig } from '../../core/shared/app-config';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class SanPhamMenuService {

  viCollator: Intl.Collator;

  constructor(private http: Http) {
    this.viCollator = new Intl.Collator('vi');
  }

  getMenu(): Observable<SanPhamMenu> {
    return this.http.get(appConfig[this.env]['helpers']['san_phams_menu'])
      .map(res => res.json()['menu'])
      .map(rawMenu => this.processMenu(rawMenu));
  }

  processMenu(rawMenu: SanPhamMenuItem[]): SanPhamMenu {
    let sanPhamMenu: SanPhamMenu = {
      thaoDuoc: {
        nhapNgoai: [],
        trongNuoc: []
      },
      giongHoa: [],
      cayCanh: [],
      cayAnTrai: {
        nhietDoi: [],
        onDoi: []
      }
    }

    if (!rawMenu || !rawMenu.length) return sanPhamMenu;

    // Sắp xếp theo ngôn ngữ Tiếng Việt
    rawMenu = rawMenu.sort((a, b) => {
      return this.viCollator.compare(a.text, b.text);
    });

    rawMenu.forEach(item => {
      if (item.category === 'Thảo dược') {
        if (item.group === 'Nhập ngoại') sanPhamMenu.thaoDuoc.nhapNgoai.push(item);
        if (item.group === 'Trong nước') sanPhamMenu.thaoDuoc.trongNuoc.push(item);
      }
      if (item.category === 'Cây ăn trái') {
        if (item.group === 'Nhiệt đới') sanPhamMenu.cayAnTrai.nhietDoi.push(item);
        if (item.group === 'Ôn đới') sanPhamMenu.cayAnTrai.onDoi.push(item);
      }

      if (item.category === 'Giống hoa') sanPhamMenu.giongHoa.push(item);
      if (item.category === 'Cây cảnh') sanPhamMenu.cayCanh.push(item);
    })

    return sanPhamMenu;
  }

  public get env(): string {
    return (environment.production) ? 'prod' : 'dev';
  }

}

export class SanPhamMenuItem {
  category: string;
  text: string;
  keyword: string;
  group?: string;
  hightlight?: boolean;
  isExact?: boolean;
}

export class SanPhamMenu {
  thaoDuoc: {
    nhapNgoai: SanPhamMenuItem[];
    trongNuoc: SanPhamMenuItem[];
  };
  giongHoa: SanPhamMenuItem[];
  cayCanh: SanPhamMenuItem[];
  cayAnTrai: {
    nhietDoi: SanPhamMenuItem[];
    onDoi: SanPhamMenuItem[];
  };
}