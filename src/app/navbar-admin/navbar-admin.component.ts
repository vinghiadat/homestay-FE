import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarAdminComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor() { }

  onToggleSidebar() {
    this.toggleSidebar.emit();
    console.log(11);
  }
}
