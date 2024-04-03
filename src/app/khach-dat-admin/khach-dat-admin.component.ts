import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../Services/logger/logger.service';
import { Logger } from '../Models/logger/logger';
import { NhaToChucService } from '../Services/nhatochuc/nha-to-chuc.service';
import { SuKienService } from '../Services/sukien/su-kien.service';
import { NhaToChuc } from '../Models/nhatochuc/nha-to-chuc';
import { SuKien } from '../Models/sukien/su-kien';
import { Registration } from '../Models/registration/registration';
import { RegistrationService } from '../Services/registration/registration.service';
@Component({
  selector: 'app-khach-dat-admin',
  templateUrl: './khach-dat-admin.component.html',
  styleUrls: ['./khach-dat-admin.component.css']
})
export class KhachDatAdminComponent implements OnInit{
  isSidebarOpen: boolean = false; 
  listDangKy: Registration[] = [];
  eventId: number | string = '';
  userFullname: string = '';
  constructor(
    private registrationService: RegistrationService
  ) { }
  ngOnInit(): void {
    this.getAllRegistrations();
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  getAllRegistrations() {
    this.registrationService.getAllRegistrationByFilter(this.eventId,this.userFullname).subscribe({
      next: (response: Registration[]) => {
        this.listDangKy = response;
      },
      error: (error) => {

      }
    })
  }
  updateRegistration(id:number ,trangThai: number) {
    const object = {
      status: trangThai
    };
    this.registrationService.updateById(id,JSON.parse(localStorage.getItem('userId')!),object).subscribe({
      next: (response : void)=> {
        
        this.getAllRegistrations();
      },
      error: (error) => {

      }
    })
  }
}
