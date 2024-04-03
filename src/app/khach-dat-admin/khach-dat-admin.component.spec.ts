import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhachDatAdminComponent } from './khach-dat-admin.component';

describe('KhachDatAdminComponent', () => {
  let component: KhachDatAdminComponent;
  let fixture: ComponentFixture<KhachDatAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KhachDatAdminComponent]
    });
    fixture = TestBed.createComponent(KhachDatAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
