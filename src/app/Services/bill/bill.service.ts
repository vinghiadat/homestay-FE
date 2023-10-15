import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Bill } from 'src/app/Models/bill/bill';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  constructor(private http: HttpClient, private router: Router) {}

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  getBill(roomType: string, room: number): Observable<Bill[]> {
    return this.http.get<Bill[]>(
      this.getFullUrl(`api/v1/bill/roomtype/${roomType}/room/${room}`)
    );
  }
}
