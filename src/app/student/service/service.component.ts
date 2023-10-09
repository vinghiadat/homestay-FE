import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { Contract } from 'src/app/Models/contract/contract';
import { Service } from 'src/app/Models/service/service';
import { Sesmester } from 'src/app/Models/sesmester/sesmester';
import { Student } from 'src/app/Models/student/student';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ContractService } from 'src/app/Services/contract/contract.service';
import { ServiceService } from 'src/app/Services/service/service.service';
import { SesmesterService } from 'src/app/Services/sesmester/sesmester.service';
import { StudentService } from 'src/app/Services/student/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})
export class ServiceComponent implements OnInit {
  constructor(
    private service: ServiceService,
    private sesmesterService: SesmesterService,
    private authService: AuthService,
    private studentService: StudentService,
    private contractService: ContractService,
    private router: Router
  ) {}
  services: Service[] = [];
  sesmester!: Sesmester;
  student!: Student;
  contract!: Contract;
  myDate: Date = new Date();
  isCheckedDate: boolean = false; // Kiểm tra khoảng thời gian nằm trong vùng đăng ký
  ngOnInit(): void {
    this.getService();
    // this.getSesmester();
    // this.getStudent();
    // if (this.student.id && this.sesmester.id) {
    //   this.getContract(this.student.id, this.sesmester.id);
    // }
    forkJoin([
      this.sesmesterService.getSesmesterByStatus(),
      this.studentService.getStudentByNoStudent(this.authService.getUsername()),
    ]).subscribe(([sesmester, student]) => {
      this.sesmester = sesmester;
      this.student = student;
      const registrationStartDate = new Date(
        this.sesmester.registrationStartDate
      );
      const registrationEndDate = new Date(this.sesmester.registrationEndDate);

      // Lấy ngày, tháng, năm từ myDate
      const myDateDay = this.myDate.getDate();
      const myDateMonth = this.myDate.getMonth() + 1; // Lưu ý phải cộng thêm 1 vì tháng trong JavaScript bắt đầu từ 0
      const myDateYear = this.myDate.getFullYear();

      // Lấy ngày, tháng, năm từ registrationStartDate
      const startDateDay = registrationStartDate.getDate();
      const startDateMonth = registrationStartDate.getMonth() + 1;
      const startDateYear = registrationStartDate.getFullYear();

      // Lấy ngày, tháng, năm từ registrationEndDate
      const endDateDay = registrationEndDate.getDate();
      const endDateMonth = registrationEndDate.getMonth() + 1;
      const endDateYear = registrationEndDate.getFullYear();

      if (
        myDateYear >= startDateYear &&
        myDateYear <= endDateYear &&
        myDateMonth >= startDateMonth &&
        myDateMonth <= endDateMonth &&
        myDateDay >= startDateDay &&
        myDateDay <= endDateDay
      ) {
        this.isCheckedDate = true;
      }
      if (this.student.id && this.sesmester.id) {
        this.contractService
          .getContract(this.student.id, this.sesmester.id)
          .subscribe({
            next: (response: Contract) => {
              this.contract = response;
            },
            error: (error) => {
              this.router.navigate(['/home']);
            },
          });
      }
    });
  }
  getService() {
    this.service.getAllService().subscribe({
      next: (response: Service[]) => {
        this.services = response;
      },
      error: (error) => {},
    });
  }
  registerService(service: Service) {
    if (this.isCheckedDate == false) {
      Swal.fire(
        'Ngày đăng ký không phù hợp',
        'Đã hết hạn đăng ký dịch vụ',
        'warning'
      );
      return;
    }
    Swal.fire({
      title: 'Xác nhận đăng ký',
      text: 'Bạn có chắc chắn đăng ký dịch vụ này?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Tắt',
      confirmButtonText: 'Có',
    }).then((result) => {
      let s: Service[] = [];
      s.push(service);
      if (result.isConfirmed) {
        if (this.contract.id) {
          this.contractService.updateServiceForContract(this.contract.id, s);
        }
      }
    });
  }
}
