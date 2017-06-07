import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routedComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SanPhamsModule } from './san-phams/san-phams.module';

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SanPhamsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
