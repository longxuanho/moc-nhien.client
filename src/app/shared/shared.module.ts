import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafeHtmlPipe } from './safe-html.pipe';
import { VisibleOnlyPipe } from './visible-only.pipe';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SafeHtmlPipe,
    VisibleOnlyPipe,
  ],
  exports: [
    CommonModule,
    SafeHtmlPipe,
    VisibleOnlyPipe,
  ]
})
export class SharedModule { }
