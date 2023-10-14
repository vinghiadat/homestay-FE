import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Contract } from 'src/app/Models/contract/contract';
import { Service } from 'src/app/Models/service/service';
import { Sesmester } from 'src/app/Models/sesmester/sesmester';
import { Student } from 'src/app/Models/student/student';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ContractService } from 'src/app/Services/contract/contract.service';
import { RegisterServiceService } from 'src/app/Services/register-service/register-service.service';
import { ServiceService } from 'src/app/Services/service/service.service';
import { SesmesterService } from 'src/app/Services/sesmester/sesmester.service';
import { StudentService } from 'src/app/Services/student/student.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css'],
})
export class MaterialComponent implements OnInit, AfterViewInit {
  @ViewChild('output', { static: true }) outputElement!: ElementRef;

  ngAfterViewInit() {
    // Truy cập phần tử HTML và đặt nội dung
    this.outputElement.nativeElement.innerHTML = window.location.search;
  }

  constructor(
    private service: ServiceService,
    private sesmesterService: SesmesterService,
    private authService: AuthService,
    private studentService: StudentService,
    private contractService: ContractService,
    private router: Router,
    private registerService: RegisterServiceService
  ) {}
  services: Service[] = [];
  sesmester!: Sesmester;
  student!: Student;
  contract!: Contract;
  myDate: Date = new Date();
  reasonCancle: string = '';
  isCheckedDate: boolean = false; // Kiểm tra khoảng thời gian nằm trong vùng đăng ký
  ngOnInit(): void {
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
}
