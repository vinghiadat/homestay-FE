import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SuKien } from '../Models/sukien/su-kien';
import { NhaToChucService } from '../Services/nhatochuc/nha-to-chuc.service';
import { NhaToChuc } from '../Models/nhatochuc/nha-to-chuc';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TypeService } from '../Services/homestayType/type.service';
import { Type } from '../Models/homestayType/type';
import { Room } from '../Models/homestay/room';
import { RoomService } from '../Services/homestay/room.service';
import { BookingService } from '../Services/booking/booking.service';
import { Booking } from '../Models/booking/booking';
import { UserService } from '../Services/user/user.service';
import { User } from '../Models/user/user';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit {
  constructor(private userService: UserService,private bookingService: BookingService,private spinner: NgxSpinnerService,private roomService: RoomService,private typeService: TypeService,private router: Router,private route: ActivatedRoute){}
  ngOnInit(): void {
    this.getRooms();
    this.getTypes();
    this.getInfoByUsername();
    // Lấy giá trị của organizerId từ query parameter
    this.route.queryParams.subscribe(params => {
      const typeId = params['typeId'];
     
      if (typeId) {
        this.typeId = typeId;
        // Gọi API hoặc xử lý theo organizerId
        this.updateRoomByTypeId();
        // this.updateSuKienByStatusAndEventNameAndOrganizerId();
      }
    });
  }
  user!: User;
  soLuong: number = 0;
  listRooms: Room[] = [];
  listType: Type[] = [];
  roomName: string = '';
  roomStatus: string = '';
  typeId: number | null = null;
  startDateTime: Date | null = null;
  endDateTime: Date | null = null;
  price: string = '';
  getInfoByUsername() {
    this.userService.getInfoByUsername(JSON.parse(localStorage.getItem('username')!)).subscribe({
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
  getRooms() {
    this.spinner.show();
    console.log(this.roomName);
    this.roomService.getAllRooms(null,this.typeId,this.roomName,null,null,null).subscribe({
      next:(response: Room[]) => {
        this.spinner.hide();
        this.listRooms = response;
      }
    })
  }
  navigateToHomestay(id?: number) {
    if(id===undefined) {
      this.typeId = null;
      this.getRooms();
      // Tạo NavigationExtras để xóa query parameter organizerId
      const navigationExtras: NavigationExtras = {
        replaceUrl: true,  // Thay thế URL hiện tại, không tạo lịch sử duyệt web
      };

      this.router.navigate(['/homestay'], navigationExtras);
    } else {
      this.router.navigate(['/homestay'], { queryParams: { typeId: id } });
    }
    
  } 
  updateRoomByTypeId() {
    if(this.startDateTime != null && this.endDateTime !=null) {
      if(this.startDateTime > this.endDateTime) {
        alert("Ngày đến không được lớn hơn ngày đi");
      } else {
        this.roomService.getAllRooms(null,this.typeId,this.roomName,this.price,this.startDateTime,this.endDateTime).subscribe({
          next: (response: Room[]) => {
            this.spinner.hide();
            this.listRooms = response;
          },
          error: (error) => {
            // Xử lý lỗi nếu cần
          }
        });
      }
      
    }
    if(this.startDateTime == null && this.endDateTime ==null) {
      this.roomService.getAllRooms(null,this.typeId,this.roomName,this.price,null,null).subscribe({
        next: (response: Room[]) => {
          this.spinner.hide();
          this.listRooms = response;
          console.log(1111);
        },
        error: (error) => {
          // Xử lý lỗi nếu cần
        }
      });
    }
    
  }
  booking(roomId: number) {
    if(this.startDateTime == null || this.endDateTime == null) {
      alert("Vui lòng chọn ngày đến và ngày rời đi");
      return;
    }
    if(this.startDateTime>this.endDateTime) {
      alert("Vui lòng chọn đến <= ngày đi");
      return;
    }
    if(confirm("Bạn có chắc chắn muốn đặt homestay này vào thời gian: "+ this.startDateTime +" đến "+this.endDateTime)) {
      this.spinner.show();
      const booking =  {
        "room": {
          "id": roomId
        },
        "startDateTime": this.startDateTime,
        "endDateTime": this.endDateTime,
        "status": 0,
        "users": {
            "id": this.user.id
        }
      };
      console.log(booking);
      this.bookingService.bookingRoom(booking).subscribe({
        next:(response: void) => {
          this.spinner.hide();
          alert("Bạn đã đặt homestay thành công");
          this.updateRoomByTypeId();
          
        },
        error: (error) => {
          this.spinner.hide();
          alert(error.error.message);
          
        }
      })
    }
    
  }

}
