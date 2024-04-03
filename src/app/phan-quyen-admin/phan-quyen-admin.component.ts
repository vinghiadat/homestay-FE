import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/user/user.service';
import { Event, Router } from '@angular/router';
import { User } from '../Models/user/user';
import { RoleService } from '../Services/role/role.service';
import { Role } from '../Models/role/role';

@Component({
  selector: 'app-phan-quyen-admin',
  templateUrl: './phan-quyen-admin.component.html',
  styleUrls: ['./phan-quyen-admin.component.css']
})
export class PhanQuyenAdminComponent implements OnInit {
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
  searchUsername: string = ''; // thanh search chỗ user
  listUsers: User[] = [];
  listRoles: Role[] = [];
  successMessageThemQuyenHan: string = '';
  errorMessageThemQuyenHan: string = '';
  constructor(private formBuilder: FormBuilder,private userService: UserService,private router:Router, private roleService: RoleService) { 
    this.registerForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        fullname: ['', Validators.required],
        address: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        roleNames: this.formBuilder.array([])
      });
    this.themQuyenHanForm = this.formBuilder.group({
        name: ['', Validators.required]
    });
  }    
  ngOnInit(): void {
    this.getAllUsers();
    this.getAllRoles();
  }
  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.registerForm.get('roleNames') as FormArray;
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
    console.log(this.registerForm.value);
    if(this.registerForm.valid == true && this.registerForm.value.password == this.registerForm.value.confirmPassword && this.registerForm.controls['roleNames'].value.length != 0) {
      this.userService.taoTaiKhoan(this.registerForm.value).subscribe({
        next:(response: any) => {
            this.cancel();
            this.isCheckSuccess = true;
            this.successMessage = response.message;
            this.getAllUsers();
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
    if(this.themQuyenHanForm.valid == true ) {
      this.roleService.addRole(this.themQuyenHanForm.value, JSON.parse(localStorage.getItem('userId')!)).subscribe({
        next: (response: any) => {
          this.cancelRole();
          this.successMessageThemQuyenHan = 'Thêm quyền hạn thành công';
          this.getAllRoles();
        },
        error: (error) => {
          this.cancelRole();
          this.errorMessageThemQuyenHan = error.error.message;
        }
      })
    }
  }
  xoaVaiTro(id: number) {
    if(confirm("Bạn có chắc chắn xóa vai trò này ?")) {
      this.roleService.deleteById(id,JSON.parse(localStorage.getItem('userId')!)).subscribe({
        next: (response: void) => {
          alert('Xóa vai trò thành công');
          this.getAllRoles();
        },
        error: (error) => {
          alert(error.error.message);
        } 
      })
    }
    
  }
  cancelRole() {
    this.successMessageThemQuyenHan = '';
    this.errorMessageThemQuyenHan = '';
    this.themQuyenHanForm.reset();
    this.submittedThemQuyenHan = false;
    this.isCheckSuccessThemQuyenHan = false;
    this.alreadyExistRole = '';
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log(this.isSidebarOpen);
  }
  // Call Api lấy tất cả user và lọc theo bộ lọc
  getAllUsers() {
    this.userService.getAllUsers(this.searchUsername).subscribe({
      next: (response: User[]) => {
        console.log(response);
        this.listUsers = response;
        console.log(this.listUsers);
      },
      error: (error) => {

      }
    })
  }
  getAllRoles() {
    this.roleService.getAllRoles().subscribe({
      next:(response: Role[]) => {
        this.listRoles = response;
      },
      error: (error) => {

      }
    })
  }
  seachUserByUsername() {
    this.getAllUsers();
  }
  updateById(id:number ,trangThai: boolean) {
    const object = {
      status: trangThai
    };
    this.userService.updateById(id,JSON.parse(localStorage.getItem('userId')!),object).subscribe({
      next: (response : void)=> {
        
        this.getAllUsers();
      },
      error: (error) => {

      }
    })
  }
}