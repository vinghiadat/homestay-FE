import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { TrangChuComponent } from './trang-chu/trang-chu.component';
import { LoginComponent } from './login/login.component';
import { NhaToChucComponent } from './nha-to-chuc/nha-to-chuc.component';
import { SuKienComponent } from './su-kien/su-kien.component';
import { ChiTietSuKienComponent } from './chi-tiet-su-kien/chi-tiet-su-kien.component';
import { LichSuComponent } from './lich-su/lich-su.component';
import { TrangChuAdminComponent } from './trang-chu-admin/trang-chu-admin.component';
import { PhanQuyenAdminComponent } from './phan-quyen-admin/phan-quyen-admin.component';
import { InfoAdminComponent } from './info-admin/info-admin.component';


const routes: Routes = [
    { path: '', redirectTo: '/trangchu', pathMatch: 'full' },
    { path: 'trangchu',component: TrangChuComponent},
    { path: 'dangnhap',component: LoginComponent},
    { path: 'nhatochuc',component: NhaToChucComponent},
    { path: 'sukien',component: SuKienComponent},
    { path: 'chitietsukien/:id',component: ChiTietSuKienComponent},
    { path: 'lichsu',component: LichSuComponent},
    { path: 'trangchu-admin',component: TrangChuAdminComponent},
    { path: 'phanquyen-admin',component: PhanQuyenAdminComponent},
    { path: 'info-admin',component: InfoAdminComponent},
    { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
