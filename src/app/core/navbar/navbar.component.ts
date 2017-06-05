import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private loggerService: LoggerService,
    private router: Router,
  ) { }

  logout() {
    // this.authService.logout()
    //   .then(() => {
    //     this.loggerService.info('Bạn đã đăng xuất khỏi hệ thống!', 'Hẹn gặp lại,');
    //     this.router.navigate['/'];
    //   });
  }

  ngOnInit() {
    // this.managerSub = this.authService.getAuth()
    //   .mergeMap(auth => this.authService.getManagerProfile())
    //   .subscribe(managerProfile => this.managerProfile = managerProfile);
  }

  ngOnDestroy() {
    // if (this.managerSub)
    //   this.managerSub.unsubscribe();
  }

}
