import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderStudentComponent } from './header-student/header-student.component';
import { FooterStudentComponent } from './footer-student/footer-student.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderStudentComponent,
    FooterStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
