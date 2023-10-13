import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Contract } from 'src/app/Models/contract/contract';
import { Sesmester } from 'src/app/Models/sesmester/sesmester';
import { Student } from 'src/app/Models/student/student';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ContractService } from 'src/app/Services/contract/contract.service';
import { SesmesterService } from 'src/app/Services/sesmester/sesmester.service';
import { StudentService } from 'src/app/Services/student/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header-student',
  templateUrl: './header-student.component.html',
  styleUrls: ['./header-student.component.css'],
})
export class HeaderStudentComponent implements OnInit {
  sesmester!: Sesmester;
  student!: Student;
  contract!: Contract;
  myDate: Date = new Date();
  isCheckedDate: boolean = false; // Kiểm tra khoảng thời gian nằm trong vùng đăng ký
  constructor(
    private authService: AuthService,
    private router: Router,
    private sesmesterService: SesmesterService,
    private studentService: StudentService,
    private contractService: ContractService
  ) {}
  ngOnInit(): void {
    if (!localStorage.getItem('accessToken')) {
      this.router.navigate(['/login']);
    }
    forkJoin([
      this.sesmesterService.getSesmesterByStatus(),
      this.studentService.getStudentByNoStudent(this.authService.getUsername()),
    ]).subscribe(([sesmester, student]) => {
      this.sesmester = sesmester;
      this.student = student;
      const startDate = new Date(this.sesmester.startDate);
      const endDate = new Date(this.sesmester.endDate);

      // Lấy ngày, tháng, năm từ myDate
      const myDateDay = this.myDate.getDate();
      const myDateMonth = this.myDate.getMonth() + 1; // Lưu ý phải cộng thêm 1 vì tháng trong JavaScript bắt đầu từ 0
      const myDateYear = this.myDate.getFullYear();

      // Lấy ngày, tháng, năm từ registrationStartDate
      const startDateDay = startDate.getDate();
      const startDateMonth = startDate.getMonth() + 1;
      const startDateYear = startDate.getFullYear();

      // Lấy ngày, tháng, năm từ registrationEndDate
      const endDateDay = endDate.getDate();
      const endDateMonth = endDate.getMonth() + 1;
      const endDateYear = endDate.getFullYear();

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
              console.log(response);
              this.contract = response;
            },
            error: (error) => {},
          });
      }
    });
  }
  handleLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  handleRepair() {
    if (!this.contract) {
      Swal.fire(
        'Có lỗi xảy ra',
        'Bạn phải là sinh viên ở phòng mới đăng ký sửa chữa được',
        'error'
      );
      return;
    }
    if (this.isCheckedDate) {
      Swal.fire(
        'Có lỗi xảy ra',
        'Vui lòng gửi phòng hồi trong thời gian ở ký túc xá',
        'error'
      );
      return;
    }
  }
  handleService() {
    if (!this.contract) {
      Swal.fire(
        'Có lỗi xảy ra',
        'Bạn phải là sinh viên ở phòng mới đăng ký dịch vụ được',
        'error'
      );
      return;
    }
  }
}
