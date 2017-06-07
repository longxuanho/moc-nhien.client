import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { Ng2PaginationModule } from 'ng2-pagination';
import { SanPhamsRoutingModule, routedComponents } from './san-phams-routing.module';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SanPhamsRoutingModule,
    HttpModule,
    Ng2PaginationModule
  ],
  declarations: [
    routedComponents,
  ]
})
export class SanPhamsModule { }
