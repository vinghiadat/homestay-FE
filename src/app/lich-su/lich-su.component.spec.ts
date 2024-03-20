import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LichSuComponent } from './lich-su.component';

describe('LichSuComponent', () => {
  let component: LichSuComponent;
  let fixture: ComponentFixture<LichSuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LichSuComponent]
    });
    fixture = TestBed.createComponent(LichSuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
