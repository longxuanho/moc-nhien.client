import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'toastr-ng2';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { LoggerService } from './shared/logger.service';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SanPhamService } from './shared/san-pham.service';
import { SanPhamMenuService } from './shared/san-pham-menu.service';
import { CartService } from './shared/cart.service';

import './rxjs-extensions';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
  ],
  providers: [
    LoggerService,
    SanPhamService,
    SanPhamMenuService,
    CartService
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
