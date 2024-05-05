import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../Services/user/user.service';
import { Event, Router } from '@angular/router';
import { User } from '../Models/user/user';
import { RoleService } from '../Services/role/role.service';
import { Role } from '../Models/role/role';
import { NhaToChuc } from '../Models/nhatochuc/nha-to-chuc';
import { SuKien } from '../Models/sukien/su-kien';
import { datetimeFormatValidator } from '../validators/datetime-format.validator';
import { RoomService } from '../Services/homestay/room.service';
import { TypeService } from '../Services/homestayType/type.service';
import { Room } from '../Models/homestay/room';
import { Type } from '../Models/homestayType/type';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent implements OnInit {
  
  isSidebarOpen: boolean = false;
  homestayForm!: FormGroup;
  submitted = false; //Kiểm tra bấm nút submitted chưa
  isCheckSuccess: boolean = false; //Kiểm tra đăng ký thành công không
  successMessage: string = ''; //Thêm thông điệp thành công khi đăng ký
  alreadyExistAccount: string = '';
  errorMessage: string = '';
  listTypes: Type[] = [];
  searchOrganizerName: string = '';

  isEditForm: Boolean = false; //Biến kiểm tra nếu true thì form thêm ngược lại thì form edit
  idSuKien!: number;

  roomName: string = '';
  typeId: number | null = null;
  listRooms: Room[] = [];
  constructor(private formBuilder: FormBuilder, private roomService: RoomService,private typeService: TypeService,private router:Router) { 
      this.homestayForm = this.formBuilder.group({
        roomName: ['', Validators.required],
        description: [''],
        maxQuantity: ['', [Validators.required, Validators.min(1)]],
        price: ['', [Validators.required, Validators.min(1), this.checkPriceDivisibleBy1000]],
        img: ['', Validators.required],
        typeId: ['', Validators.required],
        status: [true]
      });
  }    
  
  ngOnInit(): void {
    this.getAllTypes();
    this.getHomestay();
  }
  getHomestay() {
    this.roomService.getAllRooms(null,null,null,null,null,null).subscribe({
      next:(response: Room[]) => {
        this.listRooms = response;
      }
    })
  }
  // Hàm kiểm tra giá trị price chia hết cho 1000
  checkPriceDivisibleBy1000(control: { value: string }) {
    const price = parseFloat(control.value);
    if (price % 1000 !== 0) {
      return { divisibleBy1000: true };
    }
    return null;
  }
  updateRoomByTypeIdAndRoomName() {
    this.roomService.getAllRooms(null,this.typeId,this.roomName,null,null,null).subscribe({
      next:(response: Room[]) => {
        this.listRooms = response;
      }
    })
  }

  getAllTypes() {
    this.typeService.getAllTypes(this.searchOrganizerName).subscribe({
      next: (response: Type[]) => {
        this.listTypes = response;
      },
      error: (error) => {

      }
    })
  }
  searchOByOrganizerName() {
    this.getAllTypes();
  }
  themRoom() {
    this.submitted = true;
    console.log(this.homestayForm.value);
    console.log(this.homestayForm);
    if(this.homestayForm.valid == true) {
      this.roomService.addRoom(JSON.parse(localStorage.getItem("userId")!),this.homestayForm.value).subscribe({
        next: (response: any) => {
          console.log(response);
            this.cancel();
            this.isCheckSuccess = true;
            this.successMessage = "Thêm homestay thành công";
            this.getHomestay();
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }
  // Chỉnh sửa nhà tổ chức
  suaRoom() {
    this.submitted = true;
    console.log(this.homestayForm.value)
    this.roomService.updateById(this.idSuKien,JSON.parse(localStorage.getItem('userId')!),this.homestayForm.value).subscribe({
      next: (response: void) => {
        this.cancel();
        this.isCheckSuccess = true;
        this.successMessage = "Chỉnh sửa homestay thành công";
        this.getHomestay();
      },
      error: (error) => {

      }
    })
  }
  // Lấy thông tin nhà tổ chức theo ID
  getInfoById(id: number) {
    this.idSuKien = id;
    this.roomService.getRoomById(id).subscribe({
      next: (response: Room) => {
        this.cancel();
        this.isEditForm = true;
        this.homestayForm.patchValue({
          roomName: response.roomName,
          description: response.description,
          maxQuantity: response.maxQuantity,
          price: response.price,
          img: response.img,
          typeId :response.type.id,
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
    this.homestayForm.reset();
    this.submitted = false;
    this.isCheckSuccess = false;
    this.alreadyExistAccount = '';
    this.isEditForm = false;
  }
  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log(this.isSidebarOpen);
  }
  
  deleteHomestay(id: number) {
    if(confirm('Bạn có chắc chắn muốn xóa homestay này')) {
      this.roomService.deleteById(id,JSON.parse(localStorage.getItem('userId')!)).subscribe({
        next: (response: void) => {
          alert('Xóa homestay thành công');
          this.cancel();
          this.getHomestay();
        },
        error: (error) => {
          alert(error.error.message);
        }
      })
    }
  }
}