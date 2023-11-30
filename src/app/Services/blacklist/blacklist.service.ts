import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Blacklist } from 'src/app/Models/blacklist/blacklist';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root',
})
export class BlacklistService {
  constructor(private http: HttpClient, private router: Router) {}

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  findByStudentId(id: number): Observable<Blacklist> {
    return this.http.get<Blacklist>(
      this.getFullUrl(`api/v1/blacklist/student/${id}`)
    );
  }
}
