import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { SanPhamMenuService, SanPhamMenu } from '../../core/shared/san-pham-menu.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

declare const UIkit: any;

@Component({
  selector: 'sk-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit, OnDestroy {

  @Input() mode: string = 'search-textbox';

  menu: SanPhamMenu;
  clientWidth: number = document.documentElement.clientWidth || 0;
  routeSub: Subscription;
  eventSub: Subscription;
  searchTextChanged: Subject<string> = new Subject<string>();
  $resizeEvent = Observable.fromEvent(window, 'resize');
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

  onRoute(commands: any[], extras: NavigationExtras, isCloseAfterSelect: boolean) {
    window.scrollTo(0, 0);
    this.router.navigate(commands, extras);
    
    if (isCloseAfterSelect)
      UIkit.offcanvas('#product-menu-mobile').hide();
  }

  ngOnInit() {
    this.sanPhamMenuService.getMenu()
      .subscribe(menu => this.menu = menu);

    this.routeSub = this.route.queryParams
      .subscribe(params => {
        this.searchText = params['s'] || '';
        this.queryParams = Object.assign({}, params);
      });

    this.eventSub = this.$resizeEvent
      .debounceTime(1000)
      .map(() => document.documentElement.clientWidth)
      .subscribe(width => {
        this.clientWidth = width || 0;
      })


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
    if (this.routeSub) this.routeSub.unsubscribe();
    if (this.eventSub) this.eventSub.unsubscribe();
  }

}
