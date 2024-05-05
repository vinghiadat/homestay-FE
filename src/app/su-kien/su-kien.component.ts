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

@Component({
  selector: 'app-su-kien',
  templateUrl: './su-kien.component.html',
  styleUrls: ['./su-kien.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SuKienComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService,private roomService: RoomService,private typeService: TypeService,private router: Router,private route: ActivatedRoute){}
  ngOnInit(): void {
    this.getRooms();
    this.getTypes();

    // Lấy giá trị của organizerId từ query parameter
    this.route.queryParams.subscribe(params => {
      const typeId = params['typeId'];
     
      if (typeId) {
        this.typeId = typeId;
        // Gọi API hoặc xử lý theo organizerId
        // this.updateRoomByTypeId(organizerId);
        // this.updateSuKienByStatusAndEventNameAndOrganizerId();
      }
    });
  }
  soLuong: number = 0;
  listRooms: Room[] = [];
  listType: Type[] = [];
  roomName: string = '';
  roomStatus: string = '';
  typeId: number | string = '';
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
    this.roomService.getAllRooms(null,null,null,null,null,null).subscribe({
      next:(response: Room[]) => {
        this.spinner.hide();
        this.listRooms = response;
      }
    })
  }
  navigateToSuKien(id?: number) {
    if(id===undefined) {
      this.typeId = '';
      this.getRooms();
      // Tạo NavigationExtras để xóa query parameter organizerId
      const navigationExtras: NavigationExtras = {
        replaceUrl: true,  // Thay thế URL hiện tại, không tạo lịch sử duyệt web
      };

      this.router.navigate(['/sukien'], navigationExtras);
    } else {
      this.router.navigate(['/sukien'], { queryParams: { typeId: id } });
    }
    
  } 
  updateRoomByTypeId(typeId: number) {

    this.roomService.getAllRooms(null,typeId,null,null,null,null).subscribe({
      next: (response: Room[]) => {
        this.spinner.hide();
        this.listRooms = response;
      },
      error: (error) => {
        // Xử lý lỗi nếu cần
      }
    });
  }
  // updateSuKienByStatus(status: string) {
  //   this.roomStatus = status;
  //   this.updateSuKienByStatusAndEventNameAndOrganizerId();
  // }
  // updateSuKienByStatusAndEventNameAndOrganizerId() {
  //   this.spinner.show();
  //   this.roomService.getAllRooms(this.roomStatus,this.roomName,this.typeId).subscribe({
  //     next:(response: SuKien[]) => {
  //       this.spinner.hide();
  //       this.suKien = response;
  //       console.log(this.suKien);
  //     }
  //   })
  // }

}
