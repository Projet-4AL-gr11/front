import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUserAskJoinGroupComponent } from './card-user-ask-join-group.component';

describe('CardUserAskJoinGroupComponent', () => {
  let component: CardUserAskJoinGroupComponent;
  let fixture: ComponentFixture<CardUserAskJoinGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardUserAskJoinGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardUserAskJoinGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
