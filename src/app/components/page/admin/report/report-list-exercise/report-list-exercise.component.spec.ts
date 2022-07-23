import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListExerciseComponent } from './report-list-exercise.component';

describe('ReportListExerciseComponent', () => {
  let component: ReportListExerciseComponent;
  let fixture: ComponentFixture<ReportListExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportListExerciseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
