import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SanPhamsComponent } from './san-phams.component';
import { PortalComponent } from './portal/portal.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { PortalHeroComponent } from './portal-hero/portal-hero.component';
import { SanPhamHightlightComponent } from './san-pham-hightlight/san-pham-hightlight.component';
import { SanPhamCardComponent } from './san-pham-card/san-pham-card.component';
import { SanPhamDetailsComponent } from './san-pham-details/san-pham-details.component';
import { SanPhamListComponent } from './san-pham-list/san-pham-list.component';
import { HoTroKhachHangComponent } from './ho-tro-khach-hang/ho-tro-khach-hang.component';
import { SanPhamSearchResultsComponent } from './san-pham-search-results/san-pham-search-results.component';
import { GioHangComponent } from './gio-hang/gio-hang.component';
import { ThanhToanComponent } from './thanh-toan/thanh-toan.component';

const routes: Routes = [
  {
    path: '',
    component: SanPhamsComponent,
    children: [
      { path: '', pathMatch: 'full', component: PortalComponent },
      { path: 'san-pham', pathMatch: 'full', component: SanPhamListComponent },
      { path: 'san-pham/:id', component: SanPhamDetailsComponent },
      { path: 'gio-hang', component: GioHangComponent },
      { path: 'thanh-toan', component: ThanhToanComponent },
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
  PortalHeroComponent,
  SanPhamHightlightComponent,
  SanPhamCardComponent,
  SanPhamDetailsComponent,
  SanPhamListComponent,
  HoTroKhachHangComponent,
  SanPhamSearchResultsComponent,
  GioHangComponent,
  ThanhToanComponent,
]
