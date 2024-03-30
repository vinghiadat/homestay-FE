import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/user/user.service';
import { Event, Router } from '@angular/router';

@Component({
  selector: 'app-phan-quyen-admin',
  templateUrl: './phan-quyen-admin.component.html',
  styleUrls: ['./phan-quyen-admin.component.css']
})
export class PhanQuyenAdminComponent {
  isSidebarOpen: boolean = false;
  registerForm!: FormGroup;
  themQuyenHanForm!: FormGroup;
  submitted = false; //Kiểm tra bấm nút submitted chưa
  isCheckSuccess: boolean = false; //Kiểm tra đăng ký thành công không
  successMessage: string = ''; //Thêm thông điệp thành công khi đăng ký
  alreadyExistAccount: string = '';
  errorMessage: string = '';

  submittedThemQuyenHan = false;
  isCheckSuccessThemQuyenHan = false;
  alreadyExistRole: string = '';
  constructor(private formBuilder: FormBuilder,private userService: UserService,private router:Router) { 
    this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        fullname: ['', Validators.required],
        address: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        role: this.formBuilder.array([])
      });
    this.themQuyenHanForm = this.formBuilder.group({
        roleName: ['', Validators.required]
    });
  }    
  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.registerForm.get('role') as FormArray;
    if ( e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  dangKy() {
    this.submitted = true;
    if(this.registerForm.valid == true && this.registerForm.value.password == this.registerForm.value.confirmPassword) {
      this.userService.taoTaiKhoan(this.registerForm.value).subscribe({
        next:(response: any) => {
            this.cancel();
            this.isCheckSuccess = true;
            this.successMessage = response.message;
        },
        error: (error) => {
            this.alreadyExistAccount = error.error.message;
        }
      })  
    }
  }
  cancel() {
    this.registerForm.reset();
    this.submitted = false;
    this.isCheckSuccess = false;
    this.alreadyExistAccount = '';
  }
  themQuyenHan() {
    this.submittedThemQuyenHan = true;
    if(this.themQuyenHanForm.valid == true) {
      
    }
  }
  cancelRole() {
    this.themQuyenHanForm.reset();
    this.submittedThemQuyenHan = false;
    this.isCheckSuccessThemQuyenHan = false;
    this.alreadyExistRole = '';
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log(this.isSidebarOpen);
  }
}