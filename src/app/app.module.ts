import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { NhaToChucComponent } from './nha-to-chuc/nha-to-chuc.component';
import { SuKienComponent } from './su-kien/su-kien.component';
import { TrangChuComponent } from './trang-chu/trang-chu.component';
import { ChiTietSuKienComponent } from './chi-tiet-su-kien/chi-tiet-su-kien.component';
import { DatePipe } from '@angular/common';
import { LichSuComponent } from './lich-su/lich-su.component';
import { TrangChuAdminComponent } from './trang-chu-admin/trang-chu-admin.component';
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    NhaToChucComponent,
    SuKienComponent,
    TrangChuComponent,
    ChiTietSuKienComponent,
    LichSuComponent,
    TrangChuAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
