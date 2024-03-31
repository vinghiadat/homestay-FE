import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Logger } from 'src/app/Models/logger/logger';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private http: HttpClient, private router: Router) { }

  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  getAllLoggers(): Observable<Logger[]> {
    return this.http.get<Logger[]>(this.getFullUrl(`api/v1/logger`));
  }
}
