import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIdeComponent } from './admin-ide.component';

describe('AdminIdeComponent', () => {
  let component: AdminIdeComponent;
  let fixture: ComponentFixture<AdminIdeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminIdeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
