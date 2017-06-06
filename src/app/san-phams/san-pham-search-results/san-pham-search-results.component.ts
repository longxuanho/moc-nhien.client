import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SanPhamService, SanPhamModel } from '../../core/shared/san-pham.service';
import { Subscription } from 'rxjs/Subscription';

declare const latinize: any;

@Component({
  selector: 'sk-san-pham-search-results',
  templateUrl: './san-pham-search-results.component.html',
  styleUrls: ['./san-pham-search-results.component.scss']
})
export class SanPhamSearchResultsComponent implements OnInit, OnDestroy {

  products: SanPhamModel[];
  routeSub: Subscription;
  queryParams: any;
  searchText: string;

  itemsPerPage: number = 8;
  page: number = 1;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(private route: ActivatedRoute, private sanPhamService: SanPhamService, private router: Router) { }


  ngOnInit() {
    this.routeSub = this.route.queryParams
      .do((params) => {
        this.searchText = params['s'] || '';
        this.page = +params['page'] || 1;
      })
      .switchMap(params => this.sanPhamService.getSanPhams({ search: latinize(this.searchText), page: this.page, limit: this.itemsPerPage, fields: 'ten ma giaBan soLuong trichDan cover dvt', sort: 'ten' }))
      .subscribe(res => {
        this.products = res.json();

        let paginator = JSON.parse(res.headers.get('X-Pagination'));
        if (paginator) {
          this.totalItems = paginator['totalCount'] || 0;
          this.totalPages = paginator['totalPages'] || 0;
          this.page = paginator['page'] || 1;
          this.itemsPerPage = paginator['limit'] || 8;
        }
      });
  }

  onPageChanged(page: number) {
    if (page > this.totalPages || page < 0) return;

    this.page = page;
    this.router.navigate(['/san-pham'], { queryParams: { s: this.searchText, page: this.page } })

  }

  ngOnDestroy() {
    if (this.routeSub) this.routeSub.unsubscribe();
  }

}
