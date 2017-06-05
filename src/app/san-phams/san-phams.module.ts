import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { SanPhamsRoutingModule, routedComponents } from './san-phams-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SanPhamsRoutingModule,
    HttpModule
  ],
  declarations: [
    routedComponents,
  ]
})
export class SanPhamsModule { }
