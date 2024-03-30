import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderAdminComponent {
  @Input() isSidebarOpen: boolean = false;

  isDropdownOpen: boolean = false;
  currentDropdown: string = '';
  constructor() {}
  toggleDropdown(dropdown: string): void {
    if (this.currentDropdown === dropdown) {
      this.isDropdownOpen = !this.isDropdownOpen;
    } else {
      this.currentDropdown = dropdown;
      this.isDropdownOpen = true;
    }
  }
}
