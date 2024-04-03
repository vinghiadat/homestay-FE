import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLyHoatDongAdminComponent } from './quan-ly-hoat-dong-admin.component';

describe('QuanLyHoatDongAdminComponent', () => {
  let component: QuanLyHoatDongAdminComponent;
  let fixture: ComponentFixture<QuanLyHoatDongAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanLyHoatDongAdminComponent]
    });
    fixture = TestBed.createComponent(QuanLyHoatDongAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
