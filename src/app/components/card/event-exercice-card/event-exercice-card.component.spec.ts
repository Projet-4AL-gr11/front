import { ComponentFixture, TestBed } from '@angular/core/testing';
import {EventExerciceCardComponent} from "./event-exercice-card.component";


describe('EventErxerciseComponent', () => {
  let component: EventExerciceCardComponent;
  let fixture: ComponentFixture<EventExerciceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventExerciceCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventExerciceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
