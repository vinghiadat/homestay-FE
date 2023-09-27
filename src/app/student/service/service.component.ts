import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/Models/service/service';
import { ServiceService } from 'src/app/Services/service/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})
export class ServiceComponent implements OnInit {
  constructor(private service: ServiceService) {}
  services: Service[] = [];
  ngOnInit(): void {
    this.service.getAllService().subscribe({
      next: (response: Service[]) => {
        this.services = response;
      },
      error: (error) => {},
    });
  }
}
