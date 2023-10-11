import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './student/home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginStudentComponent } from './student/login-student/login-student.component';
import { RoomlistComponent } from './student/roomlist/roomlist.component';
import { RoomTypeDetailComponent } from './student/roomlist/roomtype/room-type-detail/room-type-detail.component';
import { ReservationHistoryComponent } from './student/reservation-history/reservation-history.component';
import { InfoComponent } from './student/info/info.component';
import { ServiceComponent } from './student/service/service.component';
import { TemplateLayoutComponent } from './student/template-layout/template-layout.component';
import { TemplateFormComponent } from './student/template-layout/template-form/template-form.component';
import { PaymentFailedComponent } from './student/payment-failed/payment-failed.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginStudentComponent },
  { path: 'rooms', component: RoomlistComponent },
  { path: 'room-type-detail/:id', component: RoomTypeDetailComponent },
  { path: 'reservation-history', component: ReservationHistoryComponent },
  { path: 'info-student', component: InfoComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'payment-failed', component: PaymentFailedComponent },
  {
    path: 'template',
    component: TemplateLayoutComponent,
    children: [
      // Thêm các đường dẫn cho các trang khác ở đây
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
