import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Room } from 'src/app/Models/room/room';
import { RoomReservation } from 'src/app/Models/roomreservation/room-reservation';
import { RoomReservationRequestDTO } from 'src/app/Models/roomreservation/room-reservation-request-dto';
import { RoomType } from 'src/app/Models/roomtype/room-type';
import { Sesmester } from 'src/app/Models/sesmester/sesmester';
import { Student } from 'src/app/Models/student/student';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ImageService } from 'src/app/Services/image/image.service';
import { RoomService } from 'src/app/Services/room/room.service';
import { RoomReservationService } from 'src/app/Services/roomreservation/room-reservation.service';
import { RoomlistService } from 'src/app/Services/roomtype/roomlist.service';
import { SesmesterService } from 'src/app/Services/sesmester/sesmester.service';
import { StudentService } from 'src/app/Services/student/student.service';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
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
    private roomReservationService: RoomReservationService
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
  roomReservation: RoomReservation | null = null;
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
            myDateYear >= startDateYear &&
            myDateYear <= endDateYear &&
            myDateMonth >= startDateMonth &&
            myDateMonth <= endDateMonth &&
            myDateDay >= startDateDay &&
            myDateDay <= endDateDay
          ) {
            this.isCheckedDate = true;
          }

          if (
            myDateYear >= startUpdateYear &&
            myDateYear <= endUpdateYear &&
            myDateMonth >= startUpdateMonth &&
            myDateMonth <= endUpdateMonth &&
            myDateDay >= startUpdateDay &&
            myDateDay <= endUpdateDay
          ) {
            this.isCheckedUpdateTime = true;
          }
          if (!this.isCheckedUpdateTime && !this.isCheckedDate) {
            this.router.navigateByUrl('/rooms');
            return;
          }
        },
        error: (error) => {},
      });

      this.roomReservationService
        .findRoomReservationsByStudentNumberAndSesmesterStatusIsTrue(
          this.authService.getUsername()
        )
        .subscribe({
          next: (response: RoomReservation) => {
            console.log(response);
            if (response) {
              if (response.status === 1) {
                this.isCheckedReservation = 1;
              }
            }
          },
          error: (error) => {
            //Chỗ này nè ...................................... /.......
            console.log(error.error.message);
          },
        });
      if (this.isCheckedReservation === 1 && this.isCheckedDate === true) {
        // Không được đăng ký nữa
      }
      if (this.isCheckedReservation === 1 && this.isCheckedUpdateTime) {
        // được cập nhật lại
      }
    });
  }
  onBookingRoom(roomId: number) {
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
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Hủy bỏ',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.addRoomReservation(sesmesterId, studentId, roomId);
      }
    });
  }
  addRoomReservation(
    sesmester_id: number,
    student_id: number,
    room_id: number
  ) {
    const roomReservation: RoomReservationRequestDTO = {
      sesmester_id: sesmester_id,
      student_id: student_id,
      room_id: room_id,
    };

    this.roomReservationService.addRoomReservation(roomReservation).subscribe({
      next: (response: any) => {
        if (response == null) {
          Swal.fire('Đăng ký phòng thành công', '', 'success');
        }
      },
      error: (error: any) => {
        Swal.fire(`${error.error.message}`, '', 'error');
      },
    });
  }
}
