import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/AppConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoomReservationRequestDTO } from 'src/app/Models/roomreservation/room-reservation-request-dto';
@Injectable({
  providedIn: 'root',
})
export class RoomReservationService {
  constructor(private http: HttpClient, private router: Router) {}
  listQuantity: number[] = [];
  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  addRoomReservation(
    roomReservation: RoomReservationRequestDTO
  ): Observable<any> {
    const url = this.getFullUrl('api/v1/reservation');
    return this.http.post(url, roomReservation);
  }
}
