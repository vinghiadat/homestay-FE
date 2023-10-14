import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Contract } from 'src/app/Models/contract/contract';
import { Feedback } from 'src/app/Models/feedback/feedback';
import { Material } from 'src/app/Models/material/material';
import { Service } from 'src/app/Models/service/service';
import { Sesmester } from 'src/app/Models/sesmester/sesmester';
import { Student } from 'src/app/Models/student/student';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ContractService } from 'src/app/Services/contract/contract.service';
import { FeedbackService } from 'src/app/Services/feedback/feedback.service';
import { MaterialService } from 'src/app/Services/material/material.service';
import { RegisterServiceService } from 'src/app/Services/register-service/register-service.service';
import { ServiceService } from 'src/app/Services/service/service.service';
import { SesmesterService } from 'src/app/Services/sesmester/sesmester.service';
import { StudentService } from 'src/app/Services/student/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css'],
})
export class MaterialComponent implements OnInit {
  form: any;
  constructor(
    private service: ServiceService,
    private sesmesterService: SesmesterService,
    private authService: AuthService,
    private studentService: StudentService,
    private contractService: ContractService,
    private router: Router,
    private feedbackService: FeedbackService,
    private materialService: MaterialService,
    private fb: FormBuilder,
    private detect: ChangeDetectorRef
  ) {
    this.form = fb.group({
      quantity: [
        '',
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
      material: ['', [Validators.required]],
    });
  }
  services: Service[] = [];
  materials: Material[] = [];
  sesmester!: Sesmester;
  student!: Student;
  contract!: Contract;
  myDate: Date = new Date();
  reasonCancle: string = '';
  isCheckedDate: boolean = false;
  feedbacks: Feedback[] = [];
  ngOnInit(): void {
    this.materialService.getAllMaterial().subscribe({
      next: (response: Material[]) => {
        this.materials = response;
      },
      error: (error) => {},
    });
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
        this.getAllFeedbacks();
      }
    });
  }
  getAllFeedbacks() {
    console.log(this.student.id);
    this.feedbackService.getAllFeedbacks(this.student.id).subscribe({
      next: (response: Feedback[]) => {
        this.feedbacks = response;

        this.detect.detectChanges();
      },
      error: (error) => {},
    });
  }

  addFeedback() {
    if (this.form.value.quantity === '' || this.form.value.material === '') {
      Swal.fire('Có lỗi xảy ra', 'Vui lòng điền đầy đủ thông tin', 'error');
    }
    if (this.form.get('quantity').hasError('min')) {
      Swal.fire('Có lỗi xảy ra', 'Nhập số lượng lớn hơn hoặc bằng 1', 'error');
    }
    if (this.form.get('quantity').hasError('max')) {
      Swal.fire('Có lỗi xảy ra', 'Nhập số lượng bé hơn hoặc bằng 5', 'error');
    }
    if (this.form.invalid) {
      return;
    }
    this.feedbackService
      .addFeedback({
        material: new Material(this.form.value.material, ''),
        quantity: this.form.value.quantity,
        student: this.student,
      })
      .subscribe({
        next: (repsonse: any) => {
          this.getAllFeedbacks();
          Swal.fire('Thành công', 'Phản hồi thành công', 'success');
        },
        error: (error) => {
          Swal.fire('Lỗi', error.error.message, 'error');
        },
      });
  }
}
