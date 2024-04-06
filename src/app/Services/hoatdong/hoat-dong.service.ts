import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HoatDong } from 'src/app/Models/hoatdong/hoat-dong';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class HoatDongService {

  constructor(private http: HttpClient, private router: Router) { }

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  getHoatDongByEventIdAndDate(eventId: number,date: Date| string): Observable<HoatDong[]> {
    return this.http.get<HoatDong[]>(
      this.getFullUrl(`api/v1/activity/event/${eventId}/date/${date}`)
    );
  }
  getHoatDongByEventId(eventId: number,name: string): Observable<HoatDong[]> {
    return this.http.get<HoatDong[]>(
      this.getFullUrl(`api/v1/activity/${eventId}?activityName=${name}`)
    );
  }
  deleteById(id: number, userId:number) : Observable<any> {
    return this.http.delete<void>(
      this.getFullUrl(`api/v1/activity/${id}/user/${userId}`)
    );
  }
  addActivity(userId: number, hoatDong: HoatDong): Observable<any> {
    return this.http.post<void>(
      this.getFullUrl(`api/v1/activity/user/${userId}`),hoatDong
    );
  }
}
