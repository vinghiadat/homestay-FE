import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Room } from 'src/app/Models/room/room';
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
    });
  }
  onBookingRoom(roomId: number) {
    let sesmesterId: number;
    let studentId: number;
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
        Swal.fire('Đăng ký phòng thành công', '', 'success');
      }
    });
  }
  addRoomReservation(
    sesmester_id: number,
    student_id: number,
    room_id: number
  ) {
    console.log(sesmester_id + ' ' + student_id + ' ' + room_id);
    const roomReservation: RoomReservationRequestDTO = {
      sesmester_id: sesmester_id,
      student_id: student_id,
      room_id: room_id,
    };

    this.roomReservationService.addRoomReservation(roomReservation).subscribe({
      next: (response: any) => {},
      error: (error: any) => {},
    });
  }
}
