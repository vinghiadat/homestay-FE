import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Booking } from 'src/app/Models/booking/booking';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient, private router: Router) { }

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }

  bookingRoom(booking: any): Observable<any> {
    return this.http.post<void>(this.getFullUrl(`api/v1/booking`),booking);
  } 
  getAllBookings(registrationDate: Date | null, username: string | null): Observable<Booking[]> {
    // Tạo object để chứa các tham số của request
    const params: any = {};

    // Kiểm tra và gán các tham số không null vào params
    if (registrationDate !== null && registrationDate !== undefined) {
      params.registrationDate = registrationDate;
    }
    if (username !== null && username !== undefined) {
      params.username = username;
    }

    // Sử dụng Object.keys() để lấy tất cả các key của params và kết hợp chúng vào query string
    const queryString = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');

    // Tạo url với query string
    const url = this.getFullUrl(`api/v1/booking?${queryString}`);

    // Gửi request
    return this.http.get<Booking[]>(url);
  }
  getBookingByUserId(id: number | string,registrationDate: Date | null, typeId: number | null, roomName: string | null): Observable<Booking[]> {
    // Tạo object để chứa các tham số của request
    const params: any = {};

    // Kiểm tra và gán các tham số không null vào params
    if (registrationDate !== null && registrationDate !== undefined) {
      params.registrationDate = registrationDate;
    }
    if (typeId !== null && typeId !== undefined) {
      params.typeId = typeId;
    }
    if (roomName !== null && roomName !== undefined) {
      params.roomName = roomName;
    }

    // Sử dụng Object.keys() để lấy tất cả các key của params và kết hợp chúng vào query string
    const queryString = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');

    // Tạo url với query string
    const url = this.getFullUrl(`api/v1/booking/user/${id}?${queryString}`);

    // Gửi request
    return this.http.get<Booking[]>(url);
  }
  updateById(id: number,userId:number, r: any) :Observable<any> {
    return this.http.patch<void>(this.getFullUrl(`api/v1/booking/${id}/user/${userId}`),r);
  }
}
