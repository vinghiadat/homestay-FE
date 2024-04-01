import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NhaToChuc } from 'src/app/Models/nhatochuc/nha-to-chuc';
import { SuKien } from 'src/app/Models/sukien/su-kien';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class SuKienService {

  constructor(private http: HttpClient, private router: Router) { }

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  getSuKien(): Observable<SuKien[]> {
    return this.http.get<SuKien[]>(
      this.getFullUrl(`api/v1/event`)
    );
  }
  getSuKienByOrganizerId(organizerId: number): Observable<SuKien[]> {
    return this.http.get<SuKien[]>(
      this.getFullUrl(`api/v1/event/by-organizer?organizerId=${organizerId}`)
    );
  }
  getEventsByStatus(status: string): Observable<SuKien[]> {
    return this.http.get<SuKien[]>(
      this.getFullUrl(`api/v1/event/status?status=${status}`)
    );
  }
  getEventsByStatusAndOrganizerIdAndName(eventStatus: string | null, eventName?: string | null, organizerId?: number | string): Observable<SuKien[]> {
    return this.http.get<SuKien[]>(
      this.getFullUrl(`api/v1/event/filter?eventStatus=${eventStatus}&eventName=${eventName}&organizerId=${organizerId}`)
    );
  }
  getEventById(eventId: number): Observable<SuKien> {
    return this.http.get<SuKien>(
      this.getFullUrl(`api/v1/event/${eventId}`)
    );
  }
  getTop5SuKienByOrganizerIdExcludingEventId(organizerId: number| string, eventId: number|string): Observable<SuKien[]> {
    return this.http.get<SuKien[]>(
      this.getFullUrl(`api/v1/event/by-organizer-excluding?organizerId=${organizerId}&eventId=${eventId}`)
    );
  }
  deleteById(id: number, userId:number) : Observable<any> {
    return this.http.delete<void>(this.getFullUrl(`api/v1/event/${id}/user/${userId}`));
  }
  addSuKien(userId:number, suKien: SuKien): Observable<any> {
    return this.http.post<void>(this.getFullUrl(`api/v1/event/user/${userId}`),suKien);
  }
  updateById(id:number, userId: number, sukien: SuKien): Observable<any> {
    return this.http.patch<void>(this.getFullUrl(`api/v1/event/${id}/user/${userId}`),sukien);
  }
}
