import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Ng2PaginationModule } from 'ng2-pagination';
import { SanPhamsRoutingModule, routedComponents } from './san-phams-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SanPhamsRoutingModule,
    HttpModule,
    Ng2PaginationModule
  ],
  declarations: [
    routedComponents,
  ]
})
export class SanPhamsModule { }
