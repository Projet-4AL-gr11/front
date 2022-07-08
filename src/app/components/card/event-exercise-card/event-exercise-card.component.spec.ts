import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EventExerciseCardComponent} from "./event-exercise-card.component";


describe('EventErxerciseComponent', () => {
  let component: EventExerciseCardComponent;
  let fixture: ComponentFixture<EventExerciseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventExerciseCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventExerciseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
