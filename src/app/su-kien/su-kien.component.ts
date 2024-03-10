import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SuKienService } from '../Services/sukien/su-kien.service';
import { SuKien } from '../Models/sukien/su-kien';
import { NhaToChucService } from '../Services/nhatochuc/nha-to-chuc.service';
import { NhaToChuc } from '../Models/nhatochuc/nha-to-chuc';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-su-kien',
  templateUrl: './su-kien.component.html',
  styleUrls: ['./su-kien.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SuKienComponent implements OnInit {
  constructor(private suKienService: SuKienService,private nhaToChucService: NhaToChucService,private router: Router,private route: ActivatedRoute){}
  ngOnInit(): void {
    this.getSuKien();
    this.getNhaToChuc();

    // Lấy giá trị của organizerId từ query parameter
    this.route.queryParams.subscribe(params => {
      const organizerId = params['organizerId'];
      if (organizerId) {
        // Gọi API hoặc xử lý theo organizerId
        this.updateSuKienByOrganizerId(organizerId);
      }
    });
  }
  suKien: SuKien[] = [];
  nhaToChuc: NhaToChuc[] = [];
  getNhaToChuc() {
    this.nhaToChucService.getNhaToChuc().subscribe({
      next: (response: NhaToChuc[]) => {
        this.nhaToChuc = response;
      }
    })
  }
  getSuKien() {
    this.suKienService.getSuKien().subscribe({
      next:(response: SuKien[]) => {
        this.suKien = response;
      }
    })
  }
  navigateToSuKien(id: number) {
    this.router.navigate(['/sukien'], { queryParams: { organizerId: id } });
  } 
  updateSuKienByOrganizerId(organizerId: number) {
    this.suKienService.getSuKienByOrganizerId(organizerId).subscribe({
      next: (response: SuKien[]) => {
        this.suKien = response;
      },
      error: (error) => {
        // Xử lý lỗi nếu cần
      }
    });
  }
}
