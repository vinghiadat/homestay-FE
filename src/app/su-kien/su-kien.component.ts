import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SuKienService } from '../Services/sukien/su-kien.service';
import { SuKien } from '../Models/sukien/su-kien';
import { NhaToChucService } from '../Services/nhatochuc/nha-to-chuc.service';
import { NhaToChuc } from '../Models/nhatochuc/nha-to-chuc';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-su-kien',
  templateUrl: './su-kien.component.html',
  styleUrls: ['./su-kien.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SuKienComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService,private suKienService: SuKienService,private nhaToChucService: NhaToChucService,private router: Router,private route: ActivatedRoute){}
  ngOnInit(): void {
    this.getSuKien();
    this.getNhaToChuc();

    // Lấy giá trị của organizerId từ query parameter
    this.route.queryParams.subscribe(params => {
      const organizerId = params['organizerId'];
     
      if (organizerId) {
        this.organizerId = organizerId;
        // Gọi API hoặc xử lý theo organizerId
        // this.updateSuKienByOrganizerId(organizerId);
        this.updateSuKienByStatusAndEventNameAndOrganizerId();
      }
    });
  }
  soLuong: number = 0;
  suKien: SuKien[] = [];
  nhaToChuc: NhaToChuc[] = [];
  tenSuKien: string = '';
  eventStatus: string = '';
  organizerId: number | string = '';
  getNhaToChuc() {
    this.spinner.show();
    this.nhaToChucService.getNhaToChuc('').subscribe({
      next: (response: NhaToChuc[]) => {
        this.spinner.hide();
        this.nhaToChuc = response;
      }
    })
  }
  getSuKien() {
    this.spinner.show();
    this.suKienService.getSuKien().subscribe({
      next:(response: SuKien[]) => {
        this.spinner.hide();
        this.suKien = response;
      }
    })
  }
  navigateToSuKien(id?: number) {
    if(id===undefined) {
      this.organizerId = '';
      this.getSuKien();
      // Tạo NavigationExtras để xóa query parameter organizerId
      const navigationExtras: NavigationExtras = {
        replaceUrl: true,  // Thay thế URL hiện tại, không tạo lịch sử duyệt web
      };

      this.router.navigate(['/sukien'], navigationExtras);
    } else {
      this.router.navigate(['/sukien'], { queryParams: { organizerId: id } });
    }
    
  } 
  updateSuKienByOrganizerId(organizerId: number) {

    this.suKienService.getSuKienByOrganizerId(organizerId).subscribe({
      next: (response: SuKien[]) => {
        this.spinner.hide();
        this.suKien = response;
      },
      error: (error) => {
        // Xử lý lỗi nếu cần
      }
    });
  }
  updateSuKienByStatus(status: string) {
    this.eventStatus = status;
    this.updateSuKienByStatusAndEventNameAndOrganizerId();
  }
  updateSuKienByStatusAndEventNameAndOrganizerId() {
    this.spinner.show();
    this.suKienService.getEventsByStatusAndOrganizerIdAndName(this.eventStatus,this.tenSuKien,this.organizerId).subscribe({
      next:(response: SuKien[]) => {
        this.spinner.hide();
        this.suKien = response;
        console.log(this.suKien);
      }
    })
  }

}
