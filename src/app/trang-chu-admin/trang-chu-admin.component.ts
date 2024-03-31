import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../Services/logger/logger.service';
import { Logger } from '../Models/logger/logger';
import { NhaToChucService } from '../Services/nhatochuc/nha-to-chuc.service';
import { SuKienService } from '../Services/sukien/su-kien.service';
import { NhaToChuc } from '../Models/nhatochuc/nha-to-chuc';
import { SuKien } from '../Models/sukien/su-kien';

@Component({
  selector: 'app-trang-chu-admin',
  templateUrl: './trang-chu-admin.component.html',
  styleUrls: ['./trang-chu-admin.component.css']
})
export class TrangChuAdminComponent implements OnInit{
  isSidebarOpen: boolean = false; 
  loggers: Logger[] = [];
  listNhaToChuc: NhaToChuc[] = [];
  listSuKien: SuKien[] = [];
  constructor(
    private loggerService: LoggerService,
    private nhaToChucService: NhaToChucService,
    private suKienService: SuKienService
  ) { }
  ngOnInit(): void {
    this.getAllLoggers();
    this.getAllNhaToChuc();
    this.getAllSuKien();
  }
  getAllLoggers() {
    this.loggerService.getAllLoggers().subscribe({
      next: (responses: Logger[]) => {
        console.log(responses);
        this.loggers = responses;
      },
      error: (error) => {
        
      }
    })
  }
  getAllNhaToChuc() {
    this.nhaToChucService.getNhaToChuc('').subscribe({
      next: (response : NhaToChuc[]) => {
        this.listNhaToChuc = response;
      },
      error: (error) => {

      }
    })
  }
  getAllSuKien() {
    this.suKienService.getSuKien().subscribe({
      next: (response : SuKien[]) => {
        this.listSuKien = response;
      },
      error: (error) => {

      }
    })
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log(this.isSidebarOpen);
  }
}
