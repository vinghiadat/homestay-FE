import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../Services/logger/logger.service';
import { Logger } from '../Models/logger/logger';
import { NhaToChucService } from '../Services/nhatochuc/nha-to-chuc.service';
import { SuKienService } from '../Services/sukien/su-kien.service';
import { NhaToChuc } from '../Models/nhatochuc/nha-to-chuc';
import { SuKien } from '../Models/sukien/su-kien';
import { Registration } from '../Models/registration/registration';
import { RegistrationService } from '../Services/registration/registration.service';
import { BookingService } from '../Services/booking/booking.service';
import { Booking } from '../Models/booking/booking';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-khach-dat-admin',
  templateUrl: './khach-dat-admin.component.html',
  styleUrls: ['./khach-dat-admin.component.css']
})
export class KhachDatAdminComponent implements OnInit{
  isSidebarOpen: boolean = false; 
  listDangKy: Booking[] = [];
  userFullname: string = '';
  registrationDate: Date | null =null;
  constructor(
    private bookingService: BookingService,private spinner: NgxSpinnerService,
  ) { }
  ngOnInit(): void {
    this.getAllBookings();
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  getAllBookings() {
    console.log(this.registrationDate);
    this.bookingService.getAllBookings(this.registrationDate,this.userFullname).subscribe({
      next: (response: Booking[]) => {
        this.listDangKy = response;
      },
      error: (error) => {

      }
    })
  }
  updateRegistration(id:number ,trangThai: number) {
    this.spinner.show();
    const object = {
      status: trangThai
    };
    this.bookingService.updateById(id,JSON.parse(localStorage.getItem('userId')!),object).subscribe({
      next: (response : void)=> {
        this.spinner.hide();
        this.getAllBookings();
      },
      error: (error) => {

      }
    })
  }
  cancel() {
    this.registrationDate = null;
    this.userFullname = '';
    this.getAllBookings();
  }
}
