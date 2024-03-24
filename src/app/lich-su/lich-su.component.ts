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
@Component({
  selector: 'app-lich-su',
  templateUrl: './lich-su.component.html',
  styleUrls: ['./lich-su.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LichSuComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,private userService: UserService,private spinner: NgxSpinnerService,private registrationService: RegistrationService,private nhaToChucService: NhaToChucService,private router: Router,private route: ActivatedRoute){
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['',Validators.required],
      confirmPassword: ['',Validators.required]
    })
  }
  ngOnInit(): void {
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
    console.log(login);
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
  navigateToSuKien(id?: number) {
    if(id===undefined) {
      this.organizerId = '';
      this.updateSuKienByStatusAndEventNameAndOrganizerId();
      // Tạo NavigationExtras để xóa query parameter organizerId
      const navigationExtras: NavigationExtras = {
        replaceUrl: true,  // Thay thế URL hiện tại, không tạo lịch sử duyệt web
      };

      this.router.navigate(['/sukien'], navigationExtras);
    } else {
      this.router.navigate(['/sukien'], { queryParams: { organizerId: id } });
    }
    
  } 
  checkExistByUserId() {
    const username = localStorage.getItem('username');
    this.userService.getInfoByUsername(JSON.parse(username!)).subscribe({
      next:(response: User) => {
        this.userId = response.id;
        this.user = response; 
        this.updateSuKienByStatusAndEventNameAndOrganizerId();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  updateSuKienByStatus(status: string) {
    this.eventStatus = status;
    this.updateSuKienByStatusAndEventNameAndOrganizerId();
  }
  updateSuKienByStatusAndEventNameAndOrganizerId() {
    console.log(this.userId);
    this.spinner.show();
    this.registrationService.getEventsByUserIdAndStatusAndOrganizerIdAndName(this.userId,this.eventStatus,this.tenSuKien,this.organizerId).subscribe({
      next:(response: SuKien[]) => {
        this.spinner.hide();
        this.suKien = response;
        console.log(this.suKien);
      }
    })
  }

}
