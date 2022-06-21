import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventExerciseComponent } from './event-exercise.component';

describe('EventErxerciseComponent', () => {
  let component: EventExerciseComponent;
  let fixture: ComponentFixture<EventExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventExerciseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
