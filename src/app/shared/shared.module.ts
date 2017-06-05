import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MomentPipe } from './moment.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';
import { VisibleOnlyPipe } from './visible-only.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MomentPipe,
    SafeHtmlPipe,
    VisibleOnlyPipe,
  ],
  exports: [
    CommonModule,
    MomentPipe,
    SafeHtmlPipe,
    VisibleOnlyPipe,
  ]
})
export class SharedModule { }
