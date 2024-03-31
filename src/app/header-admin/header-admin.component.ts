import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../Services/user/user.service';
import { User } from '../Models/user/user';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderAdminComponent implements OnInit {
  @Input() isSidebarOpen: boolean = false;

  isDropdownOpen: boolean = false;
  currentDropdown: string = '';
  constructor(private router: Router, private userService: UserService){}
  toggleDropdown(dropdown: string): void {
    if (this.currentDropdown === dropdown) {
      this.isDropdownOpen = !this.isDropdownOpen;
    } else {
      this.currentDropdown = dropdown;
      this.isDropdownOpen = true;
    }
  }
  user!: User;
  token : string = '';
    
    ngOnInit(): void {
      if(!localStorage.getItem('tokenAdmin')) {
        
        this.router.navigate(['/dangnhap-admin']);
      } else {
          this.token = JSON.stringify(localStorage.getItem('tokenAdmin'));
      }
      this.getUserByUsername();
    }
    getUserByUsername() {
      const username = localStorage.getItem('usernameAdmin');
      this.userService.getInfoByUsername(JSON.parse(username!)).subscribe({
        next:(response: User) => {
          this.user = response; 
          localStorage.setItem('userId',JSON.stringify(this.user.id));
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    isRouteActive(route: string): boolean {
      return this.router.url.includes(route);
    }
    dangXuat() {
      localStorage.removeItem('tokenAdmin');
      localStorage.removeItem('usernameAdmin');
      this.router.navigate(['/dangnhap-admin']);
    }
}
