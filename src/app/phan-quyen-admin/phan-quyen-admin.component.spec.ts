import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhanQuyenAdminComponent } from './phan-quyen-admin.component';

describe('PhanQuyenAdminComponent', () => {
  let component: PhanQuyenAdminComponent;
  let fixture: ComponentFixture<PhanQuyenAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhanQuyenAdminComponent]
    });
    fixture = TestBed.createComponent(PhanQuyenAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
