import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Contract } from 'src/app/Models/contract/contract';
import { Service } from 'src/app/Models/service/service';
import { AppConfig } from 'src/app/config/AppConfig';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class ContractService {
  constructor(private http: HttpClient, private router: Router) {}

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  getContract(studentId: number, sesmesterId: number): Observable<Contract> {
    return this.http.get<Contract>(
      this.getFullUrl(
        `api/v1/contract/student/${studentId}/sesmester/${sesmesterId}`
      )
    );
  }
  updateServiceForContract(contractId: number, services: Service[]): void {
    this.http
      .patch(
        this.getFullUrl(`api/v1/contract/register-service/${contractId}`),
        services
      )
      .subscribe({
        next: (response) => {
          Swal.fire('Chúc mừng', 'Bạn đã thêm dịch vụ thành công', 'success');
        },
        error: (error) => {
          Swal.fire('Có lỗi xảy ra', error.error.message, 'error');
        },
      });
  }
  addContract(contract: Contract): void {
    this.http
      .post<void>(this.getFullUrl('api/v1/contract'), contract)
      .subscribe({
        next: (repsonse: any) => {
          Swal.fire('Thành công', 'Đăng ký phòng thành công', 'success');
        },
        error: (error) => {
          Swal.fire('Lỗi', error.error.message, 'error');
        },
      });
  }
}
