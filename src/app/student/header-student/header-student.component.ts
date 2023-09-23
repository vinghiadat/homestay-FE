import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';

@Component({
  selector: 'app-header-student',
  templateUrl: './header-student.component.html',
  styleUrls: ['./header-student.component.css'],
})
export class HeaderStudentComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    if (!localStorage.getItem('accessToken')) {
      this.router.navigate(['/login']);
    }
    console.log(localStorage.getItem('accessToken'));
  }
  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
