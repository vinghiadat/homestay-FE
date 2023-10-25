import {
  Component,
  ViewEncapsulation,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/Models/room/room';
import { RoomType } from 'src/app/Models/roomtype/room-type';
import { Sesmester } from 'src/app/Models/sesmester/sesmester';
import { Student } from 'src/app/Models/student/student';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ImageService } from 'src/app/Services/image/image.service';
import { RoomService } from 'src/app/Services/room/room.service';
import { RoomlistService } from 'src/app/Services/roomtype/roomlist.service';
import { SesmesterService } from 'src/app/Services/sesmester/sesmester.service';
import { StudentService } from 'src/app/Services/student/student.service';
import Swal from 'sweetalert2';
import { ContractService } from 'src/app/Services/contract/contract.service';
import { Contract } from 'src/app/Models/contract/contract';
import { NgxSpinnerService } from 'ngx-spinner';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-room-type-detail',
  templateUrl: './room-type-detail.component.html',
  styleUrls: ['./room-type-detail.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class RoomTypeDetailComponent implements OnInit {
  constructor(
    private roomListService: RoomlistService,
    private route: ActivatedRoute,
    private imageService: ImageService,
    private roomService: RoomService,
    private router: Router,
    private authService: AuthService,
    private sesmesterService: SesmesterService,
    private studentService: StudentService,
    private contractService: ContractService,
    private spinner: NgxSpinnerService
  ) {}
  imageUrls: string[] = [];
  errorMessage: string = '';
  sesmester!: Sesmester;
  student!: Student;

  myDate: Date = new Date();
  isCheckedDate: boolean = false; // Kiểm tra khoảng thời gian nằm trong vùng đăng ký
  isCheckedUpdateTime: boolean = false; //Kiểm tra khoảng thời gian nằm trong vùng update không
  isCheckedReservation: number = 0; // Kiểm tra đã được duyệt ở chưa
  startUpdateDate!: Date;
  endUpdateDate!: Date;
  // ngOnInit(): void {
  //   console.log(this.roomType);
  //   this.roomType.images.forEach((image) => {
  //     this.imageService.getImage(image.name).subscribe((response) => {
  //       this.imageUrls.push(URL.createObjectURL(response.body!));
  //     });
  //   });
  // }
  roomType!: RoomType;
  room: Room[] = [];
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      //RoomType
      this.roomListService.getRoomTypeById(id).subscribe({
        next: (response: RoomType) => {
          this.roomType = response;
          if (this.roomType.enable === false) {
            // Sử dụng router.navigateByUrl để chuyển hướng ngay lập tức.
            this.router.navigateByUrl('/rooms');
            return;
          }
          this.roomType.images.forEach((image) => {
            this.imageService.getImage(image.name).subscribe((response) => {
              this.imageUrls.push(URL.createObjectURL(response.body!));
            });
          });
        },
        error: (error) => {
          if (error.error) {
            this.errorMessage = 'Không có loại phòng này. Quay lại ';
          }
        },
      });

      //Danh sách room
      this.roomService.getAllRoomByRoomType_Id(id).subscribe({
        next: (response: Room[]) => {
          this.room = response;
        },
        error: (error) => {
          if (error.error) {
            this.errorMessage = 'Không có loại phòng này. Quay lại ';
          }
        },
      });

      this.sesmesterService.getSesmesterByStatus().subscribe({
        next: (response: Sesmester) => {
          this.sesmester = response;
          this.startUpdateDate = new Date(this.sesmester.startDate);
          this.startUpdateDate.setDate(this.startUpdateDate.getDate() + 7);
          this.endUpdateDate = new Date(this.startUpdateDate);
          this.endUpdateDate.setDate(this.endUpdateDate.getDate() + 7);

          const registrationStartDate = new Date(
            this.sesmester.registrationStartDate
          );
          const registrationEndDate = new Date(
            this.sesmester.registrationEndDate
          );

          // Lấy ngày, tháng, năm từ myDate
          const myDateDay = this.myDate.getDate();
          const myDateMonth = this.myDate.getMonth() + 1; // Lưu ý phải cộng thêm 1 vì tháng trong JavaScript bắt đầu từ 0
          const myDateYear = this.myDate.getFullYear();

          // Lấy ngày, tháng, năm từ startUpdateDate
          const startUpdateDay = this.startUpdateDate.getDate();
          const startUpdateMonth = this.startUpdateDate.getMonth() + 1; // Lưu ý phải cộng thêm 1 vì tháng trong JavaScript bắt đầu từ 0
          const startUpdateYear = this.startUpdateDate.getFullYear();

          // Lấy ngày, tháng, năm từ endUpdateDate
          const endUpdateDay = this.endUpdateDate.getDate();
          const endUpdateMonth = this.endUpdateDate.getMonth() + 1; // Lưu ý phải cộng thêm 1 vì tháng trong JavaScript bắt đầu từ 0
          const endUpdateYear = this.endUpdateDate.getFullYear();

          // Lấy ngày, tháng, năm từ registrationStartDate
          const startDateDay = registrationStartDate.getDate();
          const startDateMonth = registrationStartDate.getMonth() + 1;
          const startDateYear = registrationStartDate.getFullYear();

          // Lấy ngày, tháng, năm từ registrationEndDate
          const endDateDay = registrationEndDate.getDate();
          const endDateMonth = registrationEndDate.getMonth() + 1;
          const endDateYear = registrationEndDate.getFullYear();

          if (
            formatDate(
              this.sesmester.registrationStartDate,
              'yyyy-MM-dd',
              'en'
            ) <= formatDate(new Date(), 'yyyy-MM-dd', 'en') &&
            formatDate(
              this.sesmester.registrationEndDate,
              'yyyy-MM-dd',
              'en'
            ) >= formatDate(new Date(), 'yyyy-MM-dd', 'en')
          ) {
            this.isCheckedDate = true;
          }
          if (!this.isCheckedUpdateTime && !this.isCheckedDate) {
            this.router.navigateByUrl('/rooms');
            return;
          }
        },
        error: (error) => {},
      });

      if (this.isCheckedReservation === 1 && this.isCheckedDate === true) {
        // Không được đăng ký nữa
      }
      if (this.isCheckedReservation === 1 && this.isCheckedUpdateTime) {
        // được cập nhật lại
      }
    });
  }
  onBookingRoom(r: Room) {
    let sesmesterId: number;
    let studentId: number;
    if (this.isCheckedReservation === 1 && this.isCheckedDate === true) {
      //không đăng ký được nữa
      Swal.fire(
        'Bạn đã ở một phòng khác rồi',
        'Nếu cần chuyển phòng hãy quay lại thời gian quy định!',
        'error'
      );
      return;
    }
    if (this.isCheckedReservation === 1 && this.isCheckedUpdateTime) {
      // được cập nhật lại
      return;
    }
    this.studentService
      .getStudentByNoStudent(this.authService.getUsername())
      .subscribe({
        next: (response: Student) => {
          this.student = response;
          studentId = this.student.id;
        },
        error: (error) => {
          console.log(error);
        },
      });
    this.sesmesterService.getSesmesterByStatus().subscribe({
      next: (response: Sesmester) => {
        this.sesmester = response;
        sesmesterId = this.sesmester.id;
      },
      error: (error) => {
        console.log(error);
      },
    });

    Swal.fire({
      title: 'Bạn có chắc chắn đăng ký phòng này ?',
      text: 'Sau khi thanh toán bạn không thể hoàn tác.',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Hủy bỏ',
    }).then((result) => {
      if (result.isConfirmed) {
        this.addRoomReservation(this.sesmester, this.student, this.roomType, r);
      }
    });
  }
  addRoomReservation(
    sesmester: Sesmester,
    student: Student,
    roomType: RoomType,
    r: Room
  ) {
    this.spinner.show(); // Hiển thị spinner
    const contract = new Contract(
      0,
      student,
      sesmester,
      0,
      roomType.name,
      r.numberRoom,
      new Date(),
      null,
      null,
      null,
      null
    );
    this.contractService.addContract(contract);
  }
}
