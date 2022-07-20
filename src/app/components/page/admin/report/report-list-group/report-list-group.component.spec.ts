import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListGroupComponent } from './report-list-group.component';

describe('ReportListGroupComponent', () => {
  let component: ReportListGroupComponent;
  let fixture: ComponentFixture<ReportListGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportListGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
