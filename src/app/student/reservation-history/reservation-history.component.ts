import { Component, OnInit } from '@angular/core';
import { RoomReservation } from 'src/app/Models/roomreservation/room-reservation';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ImageService } from 'src/app/Services/image/image.service';
import { RoomReservationService } from 'src/app/Services/roomreservation/room-reservation.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-reservation-history',
  templateUrl: './reservation-history.component.html',
  styleUrls: ['./reservation-history.component.css'],
})
export class ReservationHistoryComponent implements OnInit {
  constructor(
    private reservationService: RoomReservationService,
    private authService: AuthService,
    private imageService: ImageService,
    private router: Router
  ) {}

  roomReservation$ = new BehaviorSubject<RoomReservation | null>(null);
  imageUrls: string[] = [];
  errorMessage: string = '';
  ngOnInit(): void {
    this.findRoomReservationsByStudentNumberAndSesmesterStatusIsTrue();
  }
  findRoomReservationsByStudentNumberAndSesmesterStatusIsTrue(): void {
    this.reservationService
      .findRoomReservationsByStudentNumberAndSesmesterStatusIsTrue(
        this.authService.getUsername()
      )
      .subscribe({
        next: (response: RoomReservation) => {
          this.roomReservation$.next(response);
          response.roomType.images.forEach((image) => {
            this.imageService.getImage(image.name).subscribe((response) => {
              this.imageUrls.push(URL.createObjectURL(response.body!));
            });
          });
        },
        error: (error) => {
          this.roomReservation$.next(null);
          this.errorMessage = error.error.message;
        },
      });
  }
  handleCancelRoom(id: number) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn hủy bỏ đăng ký ?',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.reservationService.deleteRoomReservationById(id).subscribe({
          next: (response: any) => {
            Swal.fire('Xóa đăng ký phòng thành công', '', 'success');
            this.findRoomReservationsByStudentNumberAndSesmesterStatusIsTrue();
          },
          error: (error) => {},
        });
      }
    });
  }
}
