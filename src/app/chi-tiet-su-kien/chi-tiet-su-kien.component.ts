import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SuKienService } from '../Services/sukien/su-kien.service';
import { SuKien } from '../Models/sukien/su-kien';
import { HoatDongService } from '../Services/hoatdong/hoat-dong.service';
import { HoatDong } from '../Models/hoatdong/hoat-dong';
import { DatePipe } from '@angular/common';
import { UserService } from '../Services/user/user.service';
import { User } from '../Models/user/user';
import { RegistrationService } from '../Services/registration/registration.service';
import { subDays } from 'date-fns';
import { Registration } from '../Models/registration/registration';

@Component({
  selector: 'app-chi-tiet-su-kien',
  templateUrl: './chi-tiet-su-kien.component.html',
  styleUrls: ['./chi-tiet-su-kien.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChiTietSuKienComponent implements OnInit {
  eventId: number = -1;
  userId!: number;
  event!: SuKien;
  hoatDong: HoatDong[] = [];
  constructor(private registrationService: RegistrationService,private userService: UserService,private router: Router,private datePipe: DatePipe ,private route: ActivatedRoute,private suKienService: SuKienService,private hoatDongService: HoatDongService) { }
  eventDays: string[] = [];
  relatedEvents: SuKien[] = [];
  thamGiaChua: Boolean = false;
  hanDangKy!: Date;
  registration: Registration | null = null;
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Scroll lên đầu trang khi route thay đổi
        window.scrollTo(0, 0);
      }
    });
    this.getEventId();
    this.fetchEventDetails();
    this.checkExistByUserIdAndEventId();
  }
  checkExistByUserIdAndEventId() {
    this.userService.getInfoByUsername(JSON.parse(localStorage.getItem('username')!)).subscribe({
      next:(response: User) => {
        this.userId = response.id;

        this.registrationService.checkExist(response.id,this.eventId).subscribe({
          next:(response: Boolean) => {
            this.thamGiaChua = response;
          },
          error: (error) => {
            console.log(error);
          }
        })
        this.getRegistrationByUserIdAndEventId();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  getRegistrationByUserIdAndEventId()  {
    this.registrationService.getRegistrationByUserIdAndEventId(this.userId,this.eventId).subscribe({
      next: (response: Registration) => {
        this.registration = response;
      },
      error: (error) => {

      }
    })
  }
  dangKySuKien() {
    if(confirm("Khi đăng ký xong không thể hoàn tác! Bạn có muốn tiếp tục không.")) {
        this.registrationService.registerEvent({
          "users" : {
              "id" :this.userId
          },
          "event" : {
              "id":this.eventId
          }
      }).subscribe({
        next: (response: any) => {
          alert("Đăng ký sự kiện thành công!");
          this.thamGiaChua = true;
        },
        error: (error) => {
          alert(error.error.message);
        }
      })
    }
    
  }
  getEventId() {
    this.route.params.subscribe(params => {
      this.eventId = params['id'];
      // Now you can use this.eventId in your component logic
      console.log('Event ID:', this.eventId);
    });
  }
  fetchEventDetails() {
    this.suKienService.getEventById(this.eventId).subscribe({
      next: (response: SuKien) => {
        this.event = response;
        
        const startDate = new Date(this.event.startDateTime);
        const endDate = new Date(this.event.endDateTime);
        this.hanDangKy = subDays(startDate, 1);
        this.getTop5SuKienByOrganizerIdExcludingEventId(response.organizer.id,this.eventId);
      // Lặp qua từng ngày và thêm vào mảng nếu chưa tồn tại
      if(startDate && endDate) {
        while (startDate <= endDate) {
          const formattedDate = this.datePipe.transform(startDate, 'yyyy-MM-dd');
          if (!this.eventDays.includes(formattedDate!)) {
            this.eventDays.push(formattedDate!);
          }
          startDate.setDate(startDate.getDate() + 1);
        }
      }
      this.getHoatDongByEventIdAndDate(this.eventDays[0]);
      },
      error: (error) => {
        
      }
    })
  }
  goToChiTietSuKien(id: number) {
    this.router.navigateByUrl('/chitietsukien', { skipLocationChange: false }).then(() => {
      this.router.navigate(['/chitietsukien', id]);
    });
  }
  getTop5SuKienByOrganizerIdExcludingEventId(organizerId: number,eventId: number) {
    this.suKienService.getTop5SuKienByOrganizerIdExcludingEventId(organizerId,eventId).subscribe({
      next: (response: SuKien[]) => {
        this.relatedEvents = response;
      }
    })
  }
  getHoatDongByEventIdAndDate(date: string) {
    if(date == "") {
      date = this.eventDays[0];
    }
    console.log(date);
    this.hoatDongService.getHoatDongByEventIdAndDate(this.eventId,date).subscribe({
      next: (response: HoatDong[]) => {
        console.log(response);
        this.hoatDong =response;
      },
      error: (error) => {

      }
    })
  }
}