import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { dbConfigProd } from './shared/app-config';
import { LoggerService } from './shared/logger.service';
import { AuthService } from './shared/auth.service';
import { ToastrModule } from 'toastr-ng2';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';

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
    LoginComponent,
  ],
  providers: [
    LoggerService,
    AuthService
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    LoginComponent
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
