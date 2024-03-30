import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/user/user.service';
import { Event, Router } from '@angular/router';


@Component({
  selector: 'app-info-admin',
  templateUrl: './info-admin.component.html',
  styleUrls: ['./info-admin.component.css']
})
export class InfoAdminComponent {
  isSidebarOpen: boolean = false;
  changePasswordForm!: FormGroup;
  submitted = false; //Kiểm tra bấm nút submitted chưa
  isCheckSuccess: boolean = false; //Kiểm tra đăng ký thành công không
  successMessage: string = ''; //Thêm thông điệp thành công khi đăng ký
  errorMessage: string = '';
  constructor(private formBuilder: FormBuilder,private userService: UserService,private router:Router) { 
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['',Validators.required],
      confirmPassword: ['',Validators.required]
    })
  }    
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
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log(this.isSidebarOpen);
  }

}
