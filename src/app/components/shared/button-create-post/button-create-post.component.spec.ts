import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ButtonCreatePostComponent} from './button-create-post.component';

describe('ButtonCreatePostComponent', () => {
  let component: ButtonCreatePostComponent;
  let fixture: ComponentFixture<ButtonCreatePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonCreatePostComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonCreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
