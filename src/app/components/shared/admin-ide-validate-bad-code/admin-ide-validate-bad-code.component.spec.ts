import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIdeValidateBadCodeComponent } from './admin-ide-validate-bad-code.component';

describe('AdminIdeValidateBadCodeComponent', () => {
  let component: AdminIdeValidateBadCodeComponent;
  let fixture: ComponentFixture<AdminIdeValidateBadCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminIdeValidateBadCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIdeValidateBadCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
