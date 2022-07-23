import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportListPostComponent } from './report-list-post.component';

describe('ReportListPostComponent', () => {
  let component: ReportListPostComponent;
  let fixture: ComponentFixture<ReportListPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportListPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportListPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
