import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListCommentComponent } from './report-list-comment.component';

describe('ReportListCommentComponent', () => {
  let component: ReportListCommentComponent;
  let fixture: ComponentFixture<ReportListCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportListCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
