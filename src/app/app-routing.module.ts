import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { TrangChuComponent } from './trang-chu/trang-chu.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NhaToChucComponent } from './nha-to-chuc/nha-to-chuc.component';
import { SuKienComponent } from './su-kien/su-kien.component';

const routes: Routes = [
  { path: '', redirectTo: '/trangchu', pathMatch: 'full' },
    {path: 'trangchu',component: TrangChuComponent},
    {path: 'dangnhap',component: LoginComponent},
    {path: 'dangky',component: RegisterComponent},
    {path: 'nhatochuc',component: NhaToChucComponent},
    {path: 'sukien',component: SuKienComponent},
    { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
