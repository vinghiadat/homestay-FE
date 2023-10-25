import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RegisterServiceDto } from 'src/app/Models/register-service/register-service-dto';
import { Service } from 'src/app/Models/service/service';
import { Student } from 'src/app/Models/student/student';
import { AppConfig } from 'src/app/config/AppConfig';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class RegisterServiceService {
  constructor(private http: HttpClient, private router: Router) {}

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  registerService(
    student: Student,
    service: Service,
    motorbikeLicensePlate: string
  ): void {
    this.http
      .post(this.getFullUrl(`api/v1/register-services`), {
        student,
        service,
        motorbikeLicensePlate,
      })
      .subscribe({
        next: (response: any) => {
          Swal.fire(
            'Chúc mừng',
            'Bạn đã đăng ký dịch vụ thành công',
            'success'
          );
        },
        error: (error) => {
          Swal.fire('Có lỗi xảy ra', error.error.message, 'error');
        },
      });
  }
  getAllRegisterService(
    sesmesterId: number,
    studentId: number
  ): Observable<RegisterServiceDto[]> {
    let params = new HttpParams()
      .set('sesmesterId', sesmesterId.toString())
      .set('studentId', studentId.toString());
    return this.http.get<RegisterServiceDto[]>(
      this.getFullUrl(`api/v1/register-services/service`),
      {
        params,
      }
    );
  }
}
