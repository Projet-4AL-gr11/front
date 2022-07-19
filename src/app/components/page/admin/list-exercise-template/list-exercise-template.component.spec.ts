import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExerciseTemplateComponent } from './list-exercise-template.component';

describe('ListExerciseTemplateComponent', () => {
  let component: ListExerciseTemplateComponent;
  let fixture: ComponentFixture<ListExerciseTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListExerciseTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExerciseTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
