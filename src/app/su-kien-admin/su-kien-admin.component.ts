import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/user/user.service';
import { Event, Router } from '@angular/router';
import { User } from '../Models/user/user';
import { RoleService } from '../Services/role/role.service';
import { Role } from '../Models/role/role';
import { NhaToChucService } from '../Services/nhatochuc/nha-to-chuc.service';
import { NhaToChuc } from '../Models/nhatochuc/nha-to-chuc';
import { SuKienService } from '../Services/sukien/su-kien.service';
import { SuKien } from '../Models/sukien/su-kien';
import { datetimeFormatValidator } from '../validators/datetime-format.validator';

@Component({
  selector: 'app-su-kien-admin',
  templateUrl: './su-kien-admin.component.html',
  styleUrls: ['./su-kien-admin.component.css']
})
export class SuKienAdminComponent implements OnInit {
  
  isSidebarOpen: boolean = false;
  suKienForm!: FormGroup;
  submitted = false; //Kiểm tra bấm nút submitted chưa
  isCheckSuccess: boolean = false; //Kiểm tra đăng ký thành công không
  successMessage: string = ''; //Thêm thông điệp thành công khi đăng ký
  alreadyExistAccount: string = '';
  errorMessage: string = '';
  listNhaToChuc: NhaToChuc[] = [];
  searchOrganizerName: string = '';

  isEditForm: Boolean = false; //Biến kiểm tra nếu true thì form thêm ngược lại thì form edit
  idSuKien!: number;

  tenSuKien: string = '';
  eventStatus: string = '';
  organizerId: number | string = '';
  listSuKien: SuKien[] = [];
  constructor(private formBuilder: FormBuilder, private suKienService: SuKienService,private nhaToChucService: NhaToChucService,private router:Router) { 
    this.suKienForm = this.formBuilder.group({
        eventName: ['', Validators.required],
        startDateTime: ['', [Validators.required, datetimeFormatValidator()]],
        endDateTime: ['', [Validators.required, datetimeFormatValidator()]],
        description: [''],
        maxQuantity: ['', Validators.required],
        img: ['', Validators.required],
        organizerId: ['', Validators.required],
        status: ['']
      });
  }    
  
  ngOnInit(): void {
    this.getNhaToChuc();
    this.getSuKien();
  }
  getSuKien() {
    this.suKienService.getSuKien().subscribe({
      next:(response: SuKien[]) => {
        this.listSuKien = response;
      }
    })
  }
  updateSuKienByStatusAndEventNameAndOrganizerId() {
    this.suKienService.getEventsByStatusAndOrganizerIdAndName(this.eventStatus,this.tenSuKien,this.organizerId).subscribe({
      next:(response: SuKien[]) => {
        this.listSuKien = response;
      }
    })
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
  themSuKien() {
    this.submitted = true;
    console.log(this.suKienForm.value);
    if(this.suKienForm.valid == true) {
      this.suKienService.addSuKien(JSON.parse(localStorage.getItem("userId")!),this.suKienForm.value).subscribe({
        next: (response: any) => {
            this.cancel();
            this.isCheckSuccess = true;
            this.successMessage = "Thêm sự kiện thành công";
            this.getSuKien();
        },
        error: (error) => {
        }
      })
    }
  }
  // Chỉnh sửa nhà tổ chức
  suaSuKien() {
    this.submitted = true;
    console.log(this.suKienForm.value)
    this.suKienService.updateById(this.idSuKien,JSON.parse(localStorage.getItem('userId')!),this.suKienForm.value).subscribe({
      next: (response: void) => {
        this.cancel();
        this.isCheckSuccess = true;
        this.successMessage = "Chỉnh sửa sự kiện thành công";
        this.getSuKien();
      },
      error: (error) => {

      }
    })
  }
  // Lấy thông tin nhà tổ chức theo ID
  getInfoById(id: number) {
    this.idSuKien = id;
    this.suKienService.getEventById(id).subscribe({
      next: (response: SuKien) => {
        this.cancel();
        this.isEditForm = true;
        this.suKienForm.patchValue({
          eventName: response.eventName,
          startDateTime: response.startDateTime,
          endDateTime: response.endDateTime,
          description: response.description,
          maxQuantity: response.maxQuantity,
          img: response.img,
          organizerId: response.organizer.id,
          status: response.status
        });
        // Cuộn trang lên đầu
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (error) => {

      }
    })
  }
  cancel() {
    this.suKienForm.reset();
    this.submitted = false;
    this.isCheckSuccess = false;
    this.alreadyExistAccount = '';
    this.isEditForm = false;
  }
  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log(this.isSidebarOpen);
  }
  
  deleteSuKien(id: number) {
    if(confirm('Bạn có chắc chắn muốn xóa sự kiện này')) {
      this.suKienService.deleteById(id,JSON.parse(localStorage.getItem('userId')!)).subscribe({
        next: (response: void) => {
          alert('Xóa sự kiện thành công');
          this.cancel();
          this.getSuKien();
        },
        error: (error) => {
          alert(error.error.message);
        }
      })
    }
  }
}