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
  
}
