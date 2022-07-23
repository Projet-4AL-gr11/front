import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListUserComponent } from './report-list-user.component';

describe('ReportListUserComponent', () => {
  let component: ReportListUserComponent;
  let fixture: ComponentFixture<ReportListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportListUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
