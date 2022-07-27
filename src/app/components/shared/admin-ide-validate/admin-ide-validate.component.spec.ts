import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIdeValidateComponent } from './admin-ide-validate.component';

describe('AdminIdeValidateComponent', () => {
  let component: AdminIdeValidateComponent;
  let fixture: ComponentFixture<AdminIdeValidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminIdeValidateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIdeValidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
