import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NhaToChuc } from '../Models/nhatochuc/nha-to-chuc';
import { NhaToChucService } from '../Services/nhatochuc/nha-to-chuc.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-nha-to-chuc',
  templateUrl: './nha-to-chuc.component.html',
  styleUrls: ['./nha-to-chuc.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NhaToChucComponent implements OnInit {
  nhaToChuc: NhaToChuc[] = [];
  constructor(private nhaToChucService: NhaToChucService,private router: Router){}
  ngOnInit(): void {
      this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            // Scroll lên đầu trang khi route thay đổi
            window.scrollTo(0, 0);
          }
        });
      this.getNhaToChuc();
  }
  getNhaToChuc() {
    this.nhaToChucService.getNhaToChuc('').subscribe({
      next:(response: NhaToChuc[]) => {
        this.nhaToChuc = response;
      }
    })
  }
  navigateToSuKien(id: number) {
    this.router.navigate(['/sukien'], { queryParams: { organizerId: id } });
  } 
}
