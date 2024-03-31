import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuKienAdminComponent } from './su-kien-admin.component';

describe('SuKienAdminComponent', () => {
  let component: SuKienAdminComponent;
  let fixture: ComponentFixture<SuKienAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuKienAdminComponent]
    });
    fixture = TestBed.createComponent(SuKienAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
