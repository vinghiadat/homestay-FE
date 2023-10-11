import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { ImageService } from 'src/app/Services/image/image.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation-history',
  templateUrl: './reservation-history.component.html',
  styleUrls: ['./reservation-history.component.css'],
})
export class ReservationHistoryComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private imageService: ImageService
  ) {}

  imageUrls: string[] = [];
  errorMessage: string = '';
  ngOnInit(): void {}
}
