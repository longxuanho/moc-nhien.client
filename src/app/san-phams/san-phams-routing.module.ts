import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SanPhamsComponent } from './san-phams.component';
import { PortalComponent } from './portal/portal.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { CamKetBannerComponent } from './cam-ket-banner/cam-ket-banner.component';
import { PortalHeroComponent } from './portal-hero/portal-hero.component';
import { SanPhamsHightlightComponent } from './san-phams-hightlight/san-phams-hightlight.component';
import { SanPhamsCardComponent } from './san-phams-card/san-phams-card.component';
import { SanPhamDetailsComponent } from './san-pham-details/san-pham-details.component';
import { SanPhamListComponent } from './san-pham-list/san-pham-list.component';
import { HoTroKhachHangComponent } from './ho-tro-khach-hang/ho-tro-khach-hang.component';


const routes: Routes = [
  {
    path: '',
    component: SanPhamsComponent,
    children: [
      { path: '', pathMatch: 'full', component: PortalComponent },
      { path: 'san-pham', pathMatch: 'full', component: SanPhamListComponent },
      { path: 'san-pham/:id', component: SanPhamDetailsComponent },
      { path: 'ho-tro-khach-hang', component: HoTroKhachHangComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SanPhamsRoutingModule { }

export const routedComponents = [
  SanPhamsComponent,
  PortalComponent,
  MenuBarComponent,
  CamKetBannerComponent,
  PortalHeroComponent,
  SanPhamsHightlightComponent,
  SanPhamsCardComponent,
  SanPhamDetailsComponent,
  SanPhamListComponent,
  HoTroKhachHangComponent
]
