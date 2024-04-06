import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/user/user.service';
import { Event, Router,ActivatedRoute } from '@angular/router';
import { User } from '../Models/user/user';
import { RoleService } from '../Services/role/role.service';
import { Role } from '../Models/role/role';
import { NhaToChucService } from '../Services/nhatochuc/nha-to-chuc.service';
import { NhaToChuc } from '../Models/nhatochuc/nha-to-chuc';
import { SuKienService } from '../Services/sukien/su-kien.service';
import { SuKien } from '../Models/sukien/su-kien';
import { datetimeFormatValidator } from '../validators/datetime-format.validator';
import { HoatDongService } from '../Services/hoatdong/hoat-dong.service';
import { HoatDong } from '../Models/hoatdong/hoat-dong';


@Component({
  selector: 'app-quan-ly-hoat-dong-admin',
  templateUrl: './quan-ly-hoat-dong-admin.component.html',
  styleUrls: ['./quan-ly-hoat-dong-admin.component.css']
})
export class QuanLyHoatDongAdminComponent implements OnInit {
  
  isSidebarOpen: boolean = false;
  hoatDongForm!: FormGroup;
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
  suKien!: SuKien;
  eventId!: number;
  listHoatDong: HoatDong[]= [];
  activityName: string = '';
  constructor(private hoatDongService: HoatDongService,private route: ActivatedRoute,private formBuilder: FormBuilder, private suKienService: SuKienService,private nhaToChucService: NhaToChucService,private router:Router) { 
    this.hoatDongForm = this.formBuilder.group({
      activityName: ['', Validators.required],
      dateTime: ['', Validators.required], // You may add custom validators for datetime format if needed
      img: ['', Validators.required],
      description: [''],
      event: {
        id: ['']
      }
    });
  }    
  ngOnInit(): void {
    this.getEventId();

  }
  getEventId() {
    this.route.params.subscribe(params => {
      this.eventId = params['id'];
      // Now you can use this.eventId in your component logic
      this.getEventByEventId();
      this.getHoatDongById();
    });
    this.setEventIdForHoatDongForm();
  }
  setEventIdForHoatDongForm() {
    this.hoatDongForm.patchValue({
      // Set giá trị cho trường event.id
      event: {
        id: this.eventId // Giả sử eventId là trường bạn muốn set giá trị
      }
    });
    console.log(this.hoatDongForm.value);
  }
  getHoatDongById() {
    this.hoatDongService.getHoatDongByEventId(this.eventId,this.activityName).subscribe({
      next: (response: HoatDong[]) => {
        this.listHoatDong = response;
      },
      error: (error) => {
      }
    })
  }
  getEventByEventId() {
    this.suKienService.getEventById(this.eventId).subscribe({
      next: (response: SuKien) => {
        this.suKien = response;
      },
      error: (error) => {

      }
    })
  }
  themHoatDong() {
    this.submitted = true;
    this.setEventIdForHoatDongForm();
    if(this.hoatDongForm.valid == true) {
      this.hoatDongService.addActivity(JSON.parse(localStorage.getItem("userId")!),this.hoatDongForm.value).subscribe({
        next: (response: any) => {
            this.cancel();
            this.isCheckSuccess = true;
            this.successMessage = "Thêm hoạt động thành công";
            this.getHoatDongById();
        },
        error: (error) => {
          
          this.errorMessage = error.error.message;
        }
      })
    }
  }
  
  cancel() {
    this.hoatDongForm.reset();
    this.submitted = false;
    this.isCheckSuccess = false;
    this.errorMessage = '';
    this.alreadyExistAccount = '';
    this.isEditForm = false;
  }
  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log(this.isSidebarOpen);
  }
  
  deleteHoatDong(id: number) {
    if(confirm('Bạn có chắc chắn muốn xóa hoạt động này')) {
      this.hoatDongService.deleteById(id,JSON.parse(localStorage.getItem('userId')!)).subscribe({
        next: (response: void) => {
          alert('Xóa hoạt động thành công');
          this.cancel();
          this.getHoatDongById();
        },
        error: (error) => {
          alert(error.error.message);
        }
      })
    }
  }
}