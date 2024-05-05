import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Room } from 'src/app/Models/homestay/room';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient, private router: Router) { }

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  getAllRooms(maxQuantity: number | null, typeId: number| null, roomName: string| null, price: string| null, startDateTime: Date| null, endDateTime: Date| null): Observable<Room[]> {
    // Tạo object để chứa các tham số của request
    const params: any = {};

    // Kiểm tra và gán các tham số không null vào params
    if (maxQuantity !== null && maxQuantity !== undefined) {
      params.maxQuantity = maxQuantity;
    }
    if (typeId !== null && typeId !== undefined) {
      params.typeId = typeId;
    }
    if (roomName !== null && roomName !== undefined) {
      params.roomName = roomName;
    }
    if (price !== null && price !== undefined) {
      params.price = price;
    }
    if (startDateTime !== null && startDateTime !== undefined) {
      params.startDateTime = startDateTime;
    }
    if (endDateTime !== null && endDateTime !== undefined) {
      params.endDateTime = endDateTime;
    }

    // Sử dụng Object.keys() để lấy tất cả các key của params và kết hợp chúng vào query string
    const queryString = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');

    // Tạo url với query string
    const url = this.getFullUrl(`api/v1/room/filter?${queryString}`);

    // Gửi request
    return this.http.get<Room[]>(url);
  }
  deleteById(id: number, userId:number) : Observable<any> {
    return this.http.delete<void>(this.getFullUrl(`api/v1/room/${id}/user/${userId}`));
  }
  addRoom(userId:number, room: Room): Observable<any> {
    return this.http.post<void>(this.getFullUrl(`api/v1/room/user/${userId}`),room);
  }
  updateById(id:number, userId: number, room: Room): Observable<any> {
    return this.http.patch<void>(this.getFullUrl(`api/v1/room/${id}/user/${userId}`),room);
  }
  getRoomById(roomId: number): Observable<Room> {
    return this.http.get<Room>(
      this.getFullUrl(`api/v1/room/${roomId}`)
    );
  }
}
