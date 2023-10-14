import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { Feedback } from 'src/app/Models/feedback/feedback';
import { Material } from 'src/app/Models/material/material';
import { Student } from 'src/app/Models/student/student';
import { AppConfig } from 'src/app/config/AppConfig';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  addFeedback(feedback: {
    student: Student;
    material: Material;
    quantity: number;
  }): Observable<void> {
    return this.http.post<void>(this.getFullUrl('api/v1/feedback'), feedback);
  }
  getAllFeedbacks(id: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(
      this.getFullUrl(`api/v1/feedback/student/${id}`)
    );
  }
}
