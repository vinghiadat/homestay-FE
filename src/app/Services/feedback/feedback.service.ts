import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Material } from 'src/app/Models/material/material';
import { Student } from 'src/app/Models/student/student';
import { AppConfig } from 'src/app/config/AppConfig';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  // getContract(studentId: number, sesmesterId: number): Observable<Contract> {
  //   return this.http.get<Contract>(
  //     this.getFullUrl(
  //       `api/v1/contract/student/${studentId}/sesmester/${sesmesterId}`
  //     )
  //   );
  // }
  addFeedback(feedback: {
    student: Student;
    material: Material;
    quantity: number;
  }): void {
    this.http
      .post<void>(this.getFullUrl('api/v1/feedback'), feedback)
      .subscribe({
        next: (repsonse: any) => {
          this.spinner.hide();
          Swal.fire('Thành công', 'Phản hồi thành công', 'success');
        },
        error: (error) => {
          this.spinner.hide();
          Swal.fire('Lỗi', error.error.message, 'error');
        },
      });
  }
}
