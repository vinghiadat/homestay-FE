import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/user/user.service';
import { Event, Router } from '@angular/router';
import { User } from '../Models/user/user';
import { RoleService } from '../Services/role/role.service';
import { Role } from '../Models/role/role';
import { NhaToChucService } from '../Services/nhatochuc/nha-to-chuc.service';
import { NhaToChuc } from '../Models/nhatochuc/nha-to-chuc';

@Component({
  selector: 'app-nha-to-chuc-admin',
  templateUrl: './nha-to-chuc-admin.component.html',
  styleUrls: ['./nha-to-chuc-admin.component.css']
})
export class NhaToChucAdminComponent implements OnInit {
  isSidebarOpen: boolean = false;
  nhaToChucForm!: FormGroup;
  submitted = false; //Kiểm tra bấm nút submitted chưa
  isCheckSuccess: boolean = false; //Kiểm tra đăng ký thành công không
  successMessage: string = ''; //Thêm thông điệp thành công khi đăng ký
  alreadyExistAccount: string = '';
  errorMessage: string = '';
  listNhaToChuc: NhaToChuc[] = [];
  searchOrganizerName: string = '';

  isEditForm: Boolean = false; //Biến kiểm tra nếu true thì form thêm ngược lại thì form edit
  idNhaToChuc!: number;
  constructor(private formBuilder: FormBuilder,private nhaToChucService: NhaToChucService,private router:Router) { 
    this.nhaToChucForm = this.formBuilder.group({
      organizerName: ['', Validators.required],
        img: ['', Validators.required],
        address: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
      });
  }    
  ngOnInit(): void {
    this.getNhaToChuc();
  }
  getNhaToChuc() {
    this.nhaToChucService.getNhaToChuc(this.searchOrganizerName).subscribe({
      next: (response: NhaToChuc[]) => {
        this.listNhaToChuc = response;
      },
      error: (error) => {

      }
    })
  }
  searchOByOrganizerName() {
    this.getNhaToChuc();
  }
  themNhaToChuc() {
    this.submitted = true;
    console.log(this.nhaToChucForm.value);
    if(this.nhaToChucForm.valid == true) {
      this.nhaToChucService.addNhaToChuc(JSON.parse(localStorage.getItem("userId")!),this.nhaToChucForm.value).subscribe({
        next: (response: any) => {
            this.cancel();
            this.isCheckSuccess = true;
            this.successMessage = "Thêm nhà tổ chức thành công";
            this.getNhaToChuc();
        },
        error: (error) => {
        }
      })
    }
  }
  // Chỉnh sửa nhà tổ chức
  suaNhaToChuc() {
    this.submitted = true;
    this.nhaToChucService.updateById(this.idNhaToChuc,JSON.parse(localStorage.getItem('userId')!),this.nhaToChucForm.value).subscribe({
      next: (response: void) => {
        this.cancel();
        this.isCheckSuccess = true;
        this.successMessage = "Chỉnh sửa nhà tổ chức thành công";
        this.getNhaToChuc();
      },
      error: (error) => {

      }
    })
  }
  // Lấy thông tin nhà tổ chức theo ID
  getInfoById(id: number) {
    this.idNhaToChuc = id;
    this.nhaToChucService.getInfoById(id).subscribe({
      next: (response: NhaToChuc) => {
        this.isEditForm = true;
        this.nhaToChucForm.patchValue({
          organizerName: response.organizerName,
          img: response.img,
          address: response.address,
          phone: response.phone,
          email: response.email
        });
        // Cuộn trang lên đầu
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (error) => {

      }
    })
  }
  cancel() {
    this.nhaToChucForm.reset();
    this.submitted = false;
    this.isCheckSuccess = false;
    this.alreadyExistAccount = '';
    this.isEditForm = false;
  }
  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log(this.isSidebarOpen);
  }
  
  deleteNhaToChuc(id: number) {
    if(confirm('Bạn có chắc chắn muốn xóa nhà tổ chức này')) {
      this.nhaToChucService.deleteNhaToChuc(id,JSON.parse(localStorage.getItem('userId')!)).subscribe({
        next: (response: void) => {
          alert('Xóa nhà tổ chức thành công');
          this.cancel();
          this.getNhaToChuc();
        },
        error: (error) => {
          alert(error.error.message);
        }
      })
    }
  }
}