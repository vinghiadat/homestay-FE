import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../Services/logger/logger.service';
import { Logger } from '../Models/logger/logger';
import { NhaToChucService } from '../Services/nhatochuc/nha-to-chuc.service';
import { SuKienService } from '../Services/sukien/su-kien.service';
import { NhaToChuc } from '../Models/nhatochuc/nha-to-chuc';
import { SuKien } from '../Models/sukien/su-kien';
import { BookingService } from '../Services/booking/booking.service';
import { Booking } from '../Models/booking/booking';

@Component({
  selector: 'app-thong-ke',
  templateUrl: './thong-ke.component.html',
  styleUrls: ['./thong-ke.component.css']
})
export class ThongKeComponent implements OnInit{
  isSidebarOpen: boolean = false; 
  constructor(
    private bookingService: BookingService
  ) { }
  ngOnInit(): void {
    this.getAllBookings();
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log(this.isSidebarOpen);
  }
  registrationDate: Date | null = null;
  listBookings: Booking[] = [];
  dailyBookingsCount: number = 0;
  dailyRevenue: number = 0;
  monthlyBookingsCount: number = 0;
  monthlyRevenue: number = 0;

  getAllBookings() {
    this.bookingService.getAllBookings(this.registrationDate,'').subscribe({
      next: (response: Booking[]) => {
        this.listBookings = response;
      },
      error: (error) => {
        console.error('Error fetching bookings:', error);
      }
    })
  }
}
