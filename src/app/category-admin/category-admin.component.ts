import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/user/user.service';
import { Event, Router } from '@angular/router';
import { User } from '../Models/user/user';
import { RoleService } from '../Services/role/role.service';
import { Role } from '../Models/role/role';
import { NhaToChucService } from '../Services/nhatochuc/nha-to-chuc.service';
import { NhaToChuc } from '../Models/nhatochuc/nha-to-chuc';
import { Type } from '../Models/homestayType/type';
import { TypeService } from '../Services/homestayType/type.service';
@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrls: ['./category-admin.component.css']
})
export class CategoryAdminComponent implements OnInit {
  isSidebarOpen: boolean = false;
  nhaToChucForm!: FormGroup;
  typeForm!: FormGroup;
  submitted = false; //Kiểm tra bấm nút submitted chưa
  isCheckSuccess: boolean = false; //Kiểm tra đăng ký thành công không
  successMessage: string = ''; //Thêm thông điệp thành công khi đăng ký
  alreadyExistAccount: string = '';
  errorMessage: string = '';
  listType: Type[] = [];
  typeName: string = '';
  
  isEditForm: Boolean = false; //Biến kiểm tra nếu true thì form thêm ngược lại thì form edit
  idType!: number;
  constructor(private typeService: TypeService,private formBuilder: FormBuilder,private router:Router) { 
    // this.nhaToChucForm = this.formBuilder.group({
    //   organizerName: ['', Validators.required],
    //     img: ['', Validators.required],
    //     address: ['', Validators.required],
    //     phone: ['', Validators.required],
    //     email: ['', [Validators.required, Validators.email]]
    //   });
    this.typeForm = this.formBuilder.group({
      typeName: ['',Validators.required],
      img: ['', Validators.required]
    })
  }    
  ngOnInit(): void {
    this.getAllTypes();
  }
  getAllTypes() {
    this.typeService.getAllTypes(this.typeName).subscribe({
      next: (response: Type[]) => {
        this.listType = response;
      },
      error: (error) => {

      }
    })
  }
  searchByTypeName() {
    this.getAllTypes();
  }
  themType() {
    this.submitted = true;
    if(this.typeForm.valid == true) {
      this.typeService.addType(JSON.parse(localStorage.getItem("userId")!),this.typeForm.value).subscribe({
        next: (response: any) => {
            this.cancel();
            this.isCheckSuccess = true;
            this.successMessage = "Thêm loại homestay thành công";
            this.getAllTypes();
        },
        error: (error) => {
        }
      })
    }
  }
  // Chỉnh sửa nhà tổ chức
  suaType() {
    this.submitted = true;
    this.typeService.updateById(this.idType,JSON.parse(localStorage.getItem('userId')!),this.typeForm.value).subscribe({
      next: (response: void) => {
        this.cancel();
        this.isCheckSuccess = true;
        this.successMessage = "Chỉnh sửa loại homestay thành công";
        this.getAllTypes();
      },
      error: (error) => {

      }
    })
  }
  // Lấy thông tin nhà tổ chức theo ID
  getInfoById(id: number) {
    this.idType = id;
    this.typeService.getInfoById(id).subscribe({
      next: (response: Type) => {
        this.isEditForm = true;
        this.typeForm.patchValue({
          typeName: response.typeName,
          img: response.img
        });
        // Cuộn trang lên đầu
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (error) => {

      }
    })
  }
  cancel() {
    this.typeForm.reset();
    this.submitted = false;
    this.isCheckSuccess = false;
    this.alreadyExistAccount = '';
    this.isEditForm = false;
  }
  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log(this.isSidebarOpen);
  }
  
  deleteType(id: number) {
    if(confirm('Bạn có chắc chắn muốn xóa loại homestay này')) {
      this.typeService.deleteById(id,JSON.parse(localStorage.getItem('userId')!)).subscribe({
        next: (response: void) => {
          alert('Xóa loại homestay thành công');
          this.cancel();
          this.getAllTypes();
        },
        error: (error) => {
          alert(error.error.message);
        }
      })
    }
  }
}