import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListEventComponent } from './report-list-event.component';

describe('ReportListEventComponent', () => {
  let component: ReportListEventComponent;
  let fixture: ComponentFixture<ReportListEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportListEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
