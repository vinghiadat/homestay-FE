import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/Models/student/student';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { StudentService } from 'src/app/Services/student/student.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private authService: AuthService
  ) {}
  student!: Student;

  ngOnInit(): void {
    this.studentService
      .getStudentByNoStudent(this.authService.getUsername())
      .subscribe({
        next: (response: Student) => {
          this.student = response;
        },
        error: (error) => {},
      });
  }
}
