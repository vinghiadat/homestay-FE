import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhaToChucComponent } from './nha-to-chuc.component';

describe('NhaToChucComponent', () => {
  let component: NhaToChucComponent;
  let fixture: ComponentFixture<NhaToChucComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NhaToChucComponent]
    });
    fixture = TestBed.createComponent(NhaToChucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
