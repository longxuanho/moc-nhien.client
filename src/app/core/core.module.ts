import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { LoggerService } from './shared/logger.service';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SanPhamService } from './shared/san-pham.service';
import { SanPhamMenuService } from './shared/san-pham-menu.service';

import './rxjs-extensions';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    NavbarComponent,
    FooterComponent,
  ],
  providers: [
    LoggerService,
    SanPhamService,
    SanPhamMenuService
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
