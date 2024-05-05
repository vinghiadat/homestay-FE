import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { TrangChuComponent } from './trang-chu/trang-chu.component';
import { LoginComponent } from './login/login.component';
import { SuKienComponent } from './su-kien/su-kien.component';
import { ChiTietSuKienComponent } from './chi-tiet-su-kien/chi-tiet-su-kien.component';
import { LichSuComponent } from './lich-su/lich-su.component';
import { TrangChuAdminComponent } from './trang-chu-admin/trang-chu-admin.component';
import { PhanQuyenAdminComponent } from './phan-quyen-admin/phan-quyen-admin.component';
import { InfoAdminComponent } from './info-admin/info-admin.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { NhaToChucAdminComponent } from './nha-to-chuc-admin/nha-to-chuc-admin.component';
import { SuKienAdminComponent } from './su-kien-admin/su-kien-admin.component';
import { KhachDatAdminComponent } from './khach-dat-admin/khach-dat-admin.component';
import { QuanLyHoatDongAdminComponent } from './quan-ly-hoat-dong-admin/quan-ly-hoat-dong-admin.component';
import { CategoryAdminComponent } from './category-admin/category-admin.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ProductAdminComponent } from './product-admin/product-admin.component';
import { ThongKeComponent } from './thong-ke/thong-ke.component';


const routes: Routes = [
    { path: '', redirectTo: '/trangchu', pathMatch: 'full' },
    { path: 'trangchu',component: TrangChuComponent},
    { path: 'dangnhap',component: LoginComponent},
    { path: 'loaihomestay',component: CategoryComponent},
    { path: 'homestay',component: ProductComponent},
    { path: 'chitietsukien/:id',component: ChiTietSuKienComponent},
    { path: 'lichsu',component: LichSuComponent},
    { path: 'trangchu-admin',component: TrangChuAdminComponent},
    { path: 'phanquyen-admin',component: PhanQuyenAdminComponent},
    { path: 'info-admin',component: InfoAdminComponent},
    { path: 'dangnhap-admin',component: LoginAdminComponent},
    { path: 'category',component: CategoryAdminComponent},
    { path: 'homestay-admin',component: ProductAdminComponent},
    { path: 'datve',component: KhachDatAdminComponent},
    { path: 'quan-ly-su-kien-admin/:id',component: QuanLyHoatDongAdminComponent},
    { path: 'thong-ke',component: ThongKeComponent},
    { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
