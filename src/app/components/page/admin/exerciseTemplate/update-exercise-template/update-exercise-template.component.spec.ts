import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExerciseTemplateComponent } from './update-exercise-template.component';

describe('UpdateExerciseTemplateComponent', () => {
  let component: UpdateExerciseTemplateComponent;
  let fixture: ComponentFixture<UpdateExerciseTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateExerciseTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateExerciseTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
