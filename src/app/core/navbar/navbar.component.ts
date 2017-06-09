import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { DonHangService } from '../../core/shared/don-hang.service';
import { Subscription } from 'rxjs/Subscription';

import { LoggerService } from '../../core/shared/logger.service';

@Component({
  selector: 'sk-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  // managerProfile: ManagerProfile;
  // managerSub: Subscription

  itemsCountLocalSub: Subscription;
  itemsCountLocal: number = this.donHangService.getItemsCountLocal();

  constructor(
    private loggerService: LoggerService,
    private router: Router,
    private donHangService: DonHangService
  ) { }

  ngOnInit() {
    this.itemsCountLocalSub = this.donHangService.itemsCountLocalChanged$
      .subscribe(newVal => {
        this.itemsCountLocal = newVal;
      });
  }

  ngOnDestroy() {
    if (this.itemsCountLocalSub) this.itemsCountLocalSub.unsubscribe();
  }

}
