import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { dbConfigProd } from './shared/app-config';
import { LoggerService } from './shared/logger.service';
import { AuthService } from './shared/auth.service';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

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
    AuthService
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
