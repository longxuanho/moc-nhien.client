import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SanPhamMenuService, SanPhamMenu } from '../../core/shared/san-pham-menu.service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sk-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit, OnDestroy {

  @Input() mode: string = 'search-textbox';

  menu: SanPhamMenu;
  routeSub: Subscription;
  searchTextChanged: Subject<string> = new Subject<string>();
  searchText: string = '';
  queryParams: any = {};

  constructor(
    private sanPhamMenuService: SanPhamMenuService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  onSearchInput(event) {
    this.searchTextChanged.next(event);
  }

  ngOnInit() {
    this.sanPhamMenuService.getMenu()
      .subscribe(menu => this.menu = menu);

    this.routeSub = this.route.queryParams
      .subscribe(params => {
        this.searchText = params['s'] || '';
        this.queryParams = Object.assign({}, params);
      });
    this.searchTextChanged
      .debounceTime(800)
      .distinctUntilChanged()
      .subscribe(searchText => {
        let queryParams = Object.assign({}, this.queryParams);
        queryParams['s'] = searchText || '';
        this.router.navigate(['/san-pham'], { queryParams });
      });
  }

  ngOnDestroy() {
    if (this.routeSub)
      this.routeSub.unsubscribe();
  }

}
