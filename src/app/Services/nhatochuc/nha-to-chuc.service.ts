import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NhaToChuc } from 'src/app/Models/nhatochuc/nha-to-chuc';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class NhaToChucService {

  constructor(private http: HttpClient, private router: Router) { }

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  getNhaToChuc(organizerName: string | null): Observable<NhaToChuc[]> {
    return this.http.get<NhaToChuc[]>(
      this.getFullUrl(`api/v1/organizer?organizerName=${organizerName}`)
    );
  }
  addNhaToChuc(userId: number,ntc: NhaToChuc) : Observable<any> {
    return this.http.post<void>(this.getFullUrl(`api/v1/organizer/user/${userId}`),ntc);
  }
  deleteNhaToChuc(id: number, userId: number | string) : Observable<any> {
    return this.http.delete<void>(this.getFullUrl(`api/v1/organizer/${id}/user/${userId}`));
  }
  getInfoById(id: number): Observable<NhaToChuc> {
    return this.http.get<NhaToChuc>(this.getFullUrl(`api/v1/organizer/${id}`));
  }
  updateById(id: number,userId: number, nhaToChuc: NhaToChuc) : Observable<void> {
    return this.http.patch<void>(this.getFullUrl(`api/v1/organizer/${id}/user/${userId}`),nhaToChuc);
  }
}
