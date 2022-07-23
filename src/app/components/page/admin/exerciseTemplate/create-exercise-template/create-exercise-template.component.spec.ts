import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExerciseTemplateComponent } from './create-exercise-template.component';

describe('ExerciseTemplateComponent', () => {
  let component: CreateExerciseTemplateComponent;
  let fixture: ComponentFixture<CreateExerciseTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateExerciseTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExerciseTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
