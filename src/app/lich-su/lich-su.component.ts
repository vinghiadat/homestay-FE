import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SuKienService } from '../Services/sukien/su-kien.service';
import { SuKien } from '../Models/sukien/su-kien';
import { NhaToChucService } from '../Services/nhatochuc/nha-to-chuc.service';
import { NhaToChuc } from '../Models/nhatochuc/nha-to-chuc';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../Models/user/user';
import { UserService } from '../Services/user/user.service';
import { RegisterService } from '../Models/register-service/register-service';
import { RegistrationService } from '../Services/registration/registration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Room } from '../Models/homestay/room';
import { Type } from '../Models/homestayType/type';
import { BookingService } from '../Services/booking/booking.service';
import { RoomService } from '../Services/homestay/room.service';
import { TypeService } from '../Services/homestayType/type.service';
import { Booking } from '../Models/booking/booking';
import { VNPayService } from '../Services/vnpay/vnpay.service';
@Component({
  selector: 'app-lich-su',
  templateUrl: './lich-su.component.html',
  styleUrls: ['./lich-su.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LichSuComponent implements OnInit {
  constructor(private VNPayService: VNPayService,private formBuilder: FormBuilder,private userService: UserService,private bookingService: BookingService,private spinner: NgxSpinnerService,private roomService: RoomService,private typeService: TypeService,private router: Router,private route: ActivatedRoute){
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['',Validators.required],
      confirmPassword: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.getTypes();
    this.checkExistByUserId();
    // Khai báo các biến
    let login: HTMLElement | null,
        closex: HTMLElement | null,
        cancelbtn: HTMLElement | null,
        containerx: HTMLElement | null;

    // Lấy giá trị các phần tử
    containerx = document.querySelector('.containerx');
    login = document.querySelector('.login');
    closex = document.getElementById('closex');
    cancelbtn = document.querySelector('.cancelbtn');
    // Gán hành động mở modal khi click lên nút login
    if (login) {
        login.onclick = function() {
            if (containerx) {
                containerx.style.display = "block";
            }
        }
    }

    // Gán hành động đóng modal khi click lên nút closex
    if (closex) {
        closex.onclick = function() {
            if (containerx) {
                containerx.style.display = "none";
            }
        }
    }

    // Gán hành động đóng modal khi click lên nút cancel
    if (cancelbtn) {
        cancelbtn.onclick = function() {
            if (containerx) {
                containerx.style.display = "none";
            }
        }
    }

    // Gán hành động đóng modal khi click bên ngoài form đăng nhập
    window.onclick = function(e) {
        if (e.target === containerx) {
            if (containerx) {
                containerx.style.display = "none";
            }
        }
    }
  }
  changePasswordForm!: FormGroup;
  soLuong: number = 0;
  suKien: SuKien[] = [];
  nhaToChuc: NhaToChuc[] = [];
  tenSuKien: string = '';
  eventStatus: string = '';
  organizerId: number | string = '';
  userId!: number;
  user!: User;
  submitted = false; //Kiểm tra bấm nút submitted chưa
  isCheckSuccess: boolean = false; //Kiểm tra đăng ký thành công không
  successMessage: string = ''; //Thêm thông điệp thành công khi đăng ký
  errorMessage: string = '';
  changePassword() {
    this.submitted = true;
    const username = localStorage.getItem('username');
    console.log(this.changePasswordForm.value);
    if(this.changePasswordForm.valid && this.changePasswordForm.value.newPassword == this.changePasswordForm.value.confirmPassword) {
      this.userService.doiMatKhau(this.changePasswordForm.value,JSON.parse(username!)).subscribe({
        next: (response: any) => {
          this.cancel();
          this.isCheckSuccess = true;
          this.successMessage = "Đổi mật khẩu thành công";
        },
        error: (error) => {
          this.errorMessage = error.error.message;
        }
      })
    }
    
  }
  cancel() {
    this.changePasswordForm.reset();
    this.submitted = false;
    this.isCheckSuccess = false;
    this.errorMessage = '';
  }
  
  checkExistByUserId() {
    const username = localStorage.getItem('username');
    this.userService.getInfoByUsername(JSON.parse(username!)).subscribe({
      next:(response: User) => {
        this.userId = response.id;
        this.user = response; 
        this.getBookingsByUserId();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  listBookings: Booking[] = [];
  listType: Type[] = [];
  roomName: string = '';
  roomStatus: string = '';
  typeId: number | null = null;
  registrationDate: Date | null = null;
  price: string = '';
  getInfoByUsername() {
    this.userService.getInfoByUsername(JSON.parse(localStorage.getItem('usernameAdmin')!)).subscribe({
      next: (response :User) => {
        this.user = response;
      },
      error: (error) => {

      }
    })
  }
  getTypes() {
    this.spinner.show();
    this.typeService.getAllTypes('').subscribe({
      next: (response: Type[]) => {
        this.spinner.hide();
        this.listType = response;
      }
    })
  }
  getBookingsByUserId() {
    this.spinner.show();
    
    this.bookingService.getBookingByUserId(this.userId,this.registrationDate,this.typeId,this.roomName).subscribe({
      next: (response : Booking[]) => {
        this.listBookings = response;
        this.spinner.hide();
      },
      error: (error) => {
        
      }
    })
  }
  navigateToHomestay(id?: number) {
    if(id===undefined) {
      this.typeId = null;
      this.getBookingsByUserId();
      // Tạo NavigationExtras để xóa query parameter organizerId
      const navigationExtras: NavigationExtras = {
        replaceUrl: true,  // Thay thế URL hiện tại, không tạo lịch sử duyệt web
      };

      this.router.navigate(['/homestay'], navigationExtras);
    } else {
      this.router.navigate(['/homestay'], { queryParams: { typeId: id } });
    }
    
  } 
  resetFilter() {
    this.registrationDate = null;
    this.roomName = '';
    this.getBookingsByUserId();
  }
  payment(b: Booking) {
    this.VNPayService.getPayment(b.price, b.id).subscribe({
      next: (response: string) => {
        window.location.href = response;
      },
      error: (error) => {
        alert(error.error.message);
      },
    });
  }
}
