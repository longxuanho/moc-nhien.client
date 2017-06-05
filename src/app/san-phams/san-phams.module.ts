import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SanPhamsRoutingModule, routedComponents } from './san-phams-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SanPhamsRoutingModule
  ],
  declarations: [
    routedComponents,
  ]
})
export class SanPhamsModule { }
