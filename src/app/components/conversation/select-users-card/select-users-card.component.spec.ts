import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectUsersCardComponent} from './select-users-card.component';

describe('SelectUsersCardComponent', () => {
  let component: SelectUsersCardComponent;
  let fixture: ComponentFixture<SelectUsersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectUsersCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectUsersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
