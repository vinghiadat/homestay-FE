import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  [x: string]: any;
  token : string = '';
    constructor(private router: Router){}
    ngOnInit(): void {
      if(!localStorage.getItem('token')) {
        
        this.router.navigate(['/dangnhap']);
      } else {
          this.token = JSON.stringify(localStorage.getItem('token'));
      }
    }
    isRouteActive(route: string): boolean {
      return this.router.url.includes(route);
    }
    dangXuat() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.router.navigate(['/dangnhap']);
    }
  
  }
  