import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhaToChucAdminComponent } from './nha-to-chuc-admin.component';

describe('NhaToChucAdminComponent', () => {
  let component: NhaToChucAdminComponent;
  let fixture: ComponentFixture<NhaToChucAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NhaToChucAdminComponent]
    });
    fixture = TestBed.createComponent(NhaToChucAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
