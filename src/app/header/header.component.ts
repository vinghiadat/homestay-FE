import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  [x: string]: any;
    constructor(private router: Router){}
    ngOnInit(): void {
        
    }
    isRouteActive(route: string): boolean {
      return this.router.url === route;
    }
  
  }
  