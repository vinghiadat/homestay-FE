import { Component, OnInit,  ViewEncapsulation } from '@angular/core';
import { NhaToChuc } from '../Models/nhatochuc/nha-to-chuc';
import { NhaToChucService } from '../Services/nhatochuc/nha-to-chuc.service';
import { NavigationEnd, Router } from '@angular/router';
import { TypeService } from '../Services/homestayType/type.service';
import { Type } from '../Models/homestayType/type';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryComponent implements OnInit {
  listType: Type[] = [];
  typeName: string = '';
  constructor(private typeService: TypeService,private router: Router){}
  ngOnInit(): void {
      this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            // Scroll lên đầu trang khi route thay đổi
            window.scrollTo(0, 0);
          }
        });
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
  
}
