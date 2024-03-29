import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderAdminComponent {
  @Input() isSidebarOpen: boolean = false;

  constructor() { }
}
