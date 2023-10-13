import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Contract } from 'src/app/Models/contract/contract';
import { RegisterServiceDto } from 'src/app/Models/register-service/register-service-dto';
import { Sesmester } from 'src/app/Models/sesmester/sesmester';
import { Student } from 'src/app/Models/student/student';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ContractService } from 'src/app/Services/contract/contract.service';
import { RegisterServiceService } from 'src/app/Services/register-service/register-service.service';
import { SesmesterService } from 'src/app/Services/sesmester/sesmester.service';
import { StudentService } from 'src/app/Services/student/student.service';
import { VNPayService } from 'src/app/Services/vnpay/vnpay.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private authService: AuthService,
    private sesmesterService: SesmesterService,
    private contractService: ContractService,
    private vnPayService: VNPayService,
    private registerService: RegisterServiceService
  ) {}
  student!: Student;
  sesmester!: Sesmester;
  contract!: Contract;
  registerServiceDTOs: RegisterServiceDto[] = [];
  ngOnInit(): void {
    // Đặt vị trí cuộn của trang về đầu trang
    window.scrollTo(0, 0);
    forkJoin([
      this.sesmesterService.getSesmesterByStatus(),
      this.studentService.getStudentByNoStudent(this.authService.getUsername()),
    ]).subscribe(([sesmester, student]) => {
      this.sesmester = sesmester;
      this.student = student;
      if (this.student.id && this.sesmester.id) {
        this.contractService
          .getContract(this.student.id, this.sesmester.id)
          .subscribe({
            next: (response: Contract) => {
              this.contract = response;
            },
            error: (error) => {},
          });
      }
      this.registerService
        .getAllRegisterService(this.sesmester.id, this.student.id)
        .subscribe({
          next: (response: RegisterServiceDto[]) => {
            this.registerServiceDTOs = response;
            console.log(this.registerServiceDTOs);
          },
          error: (error) => {},
        });
    });
  }
  payment(price: number, id: number) {
    if (new Date() > new Date(this.sesmester.registrationEndDate)) {
      Swal.fire('Có lỗi!', 'Quá thời gian quy định đóng tiền', 'error');
      return;
    }
    this.vnPayService.getPayment(price, id).subscribe({
      next: (response: string) => {
        window.location.href = response;
      },
      error: (error) => {
        Swal.fire('Có lỗi!', error.error.message, 'error');
      },
    });
  }
}
