import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './student/home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderStudentComponent } from './student/header-student/header-student.component';
import { FooterStudentComponent } from './student/footer-student/footer-student.component';
import { LoginStudentComponent } from './student/login-student/login-student.component';
import { HttpClientModule } from '@angular/common/http';
import { RoomlistComponent } from './student/roomlist/roomlist.component';
import { RoomComponent } from './student/roomlist/roomtype/room.component';
import { RoomTypeDetailComponent } from './student/roomlist/roomtype/room-type-detail/room-type-detail.component';
import { ReservationHistoryComponent } from './student/reservation-history/reservation-history.component';
import { InfoComponent } from './student/info/info.component';
import { ServiceComponent } from './student/service/service.component';
import { TemplateLayoutComponent } from './student/template-layout/template-layout.component';
import { TemplateFormComponent } from './student/template-layout/template-form/template-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderStudentComponent,
    FooterStudentComponent,
    LoginStudentComponent,
    HomeComponent,
    NotFoundComponent,
    RoomlistComponent,
    RoomComponent,
    RoomTypeDetailComponent,
    ReservationHistoryComponent,
    InfoComponent,
    ServiceComponent,
    TemplateLayoutComponent,
    TemplateFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
