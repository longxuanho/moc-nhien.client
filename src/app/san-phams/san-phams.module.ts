import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { CustomFormsModule } from 'ng2-validation';
import { Ng2PaginationModule } from 'ng2-pagination';
import { SanPhamsRoutingModule, routedComponents } from './san-phams-routing.module';
import { TrangThaiDonHangComponent } from './trang-thai-don-hang/trang-thai-don-hang.component';
import { PortalSecondaryComponent } from './portal-secondary/portal-secondary.component';



@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SanPhamsRoutingModule,
    HttpModule,
    CustomFormsModule,
    Ng2PaginationModule
  ],
  declarations: [
    routedComponents,
    TrangThaiDonHangComponent,
    PortalSecondaryComponent,
  ]
})
export class SanPhamsModule { }
