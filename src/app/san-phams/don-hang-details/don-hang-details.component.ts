import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { DonHangService, DonHangModel } from '../../core/shared/don-hang.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'sk-don-hang-details',
  templateUrl: './don-hang-details.component.html',
  styleUrls: ['./don-hang-details.component.scss']
})
export class DonHangDetailsComponent implements OnInit, OnDestroy {

  routeSub: Subscription;

  constructor(private donHangService: DonHangService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeSub = this.route.params
      .switchMap((params: Params) => this.donHangService.getDonHang(params["id"], { fields: '-created' }))
      .subscribe(donHang => {
        console.log(donHang);
      }, error => this.handleError(error))
  }

  handleError(error) {
    console.log(error);
  }

  ngOnDestroy() {
    if (this.routeSub) this.routeSub.unsubscribe();
  }
}



