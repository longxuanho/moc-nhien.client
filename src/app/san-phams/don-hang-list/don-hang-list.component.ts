import { Component, OnInit } from '@angular/core';

import { DonHangService, DonHangModel, DonHangPager } from '../../core/shared/don-hang.service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

declare const latinize: any;

@Component({
  selector: 'sk-don-hang-list',
  templateUrl: './don-hang-list.component.html',
  styleUrls: ['./don-hang-list.component.scss']
})
export class DonHangListComponent implements OnInit {

  donHangs: DonHangModel[] = [];
  
  searchTextChanged: Subject<string> = new Subject<string>();
  searchText: string = '';

  itemsPerPage: number = 5;
  page: number = 1;
  totalItems: number = 0;
  totalPages: number = 0;
  
  fromItem: number = 0;
  toItem: number = 0;

  constructor(private donHangService: DonHangService) { }

  onSearchInput(event) {
    this.searchTextChanged.next(event);
  }

  onPageChanged(page: number) {
    if (page > this.totalPages || page < 0) return;

    this.page = page;
    this.getDonHangs({ search: latinize(this.searchText.toLowerCase()), page: this.page, limit: this.itemsPerPage, fields: 'created maDonHang trangThai itemsCount tongCong', sort: 'created' })
  }

  getDonHangs(pager: DonHangPager) {
    this.donHangService.getDonHangs(pager)
      .subscribe(res => {
        this.donHangs = res.json();
        this.donHangs = this.sortByCreated(this.donHangs);

        let paginator = JSON.parse(res.headers.get('X-Pagination'));
        if (paginator) {
          this.totalItems = paginator['totalCount'] || 0;
          this.totalPages = paginator['totalPages'] || 0;
          this.page = paginator['page'] || 1;
          this.itemsPerPage = paginator['limit'] || 8;

          this.fromItem = this.page * this.itemsPerPage - 1;
          this.toItem = this.fromItem + this.itemsPerPage - 1;
          this.fromItem = (this.fromItem < this.totalItems) ? this.fromItem : this.totalItems;
          this.toItem = (this.toItem < this.totalItems) ? this.toItem : this.totalItems;
        }
      });
  }

  sortByCreated(donHangs: DonHangModel[]) {
    return donHangs.sort((a, b) => (a.created > b.created ? -1 : 1));
  }

  ngOnInit() {
    this.searchTextChanged
      .debounceTime(800)
      .distinctUntilChanged()
      .subscribe(search => {
        if (!search) return;

        this.getDonHangs({ search: latinize(search.toLowerCase()), page: this.page, limit: this.itemsPerPage, fields: 'created maDonHang trangThai itemsCount tongCong', sort: '-created' })
      });
  }

}
