import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLeaderboardComponent } from './card-leaderboard.component';

describe('CardLeaderbordComponent', () => {
  let component: CardLeaderboardComponent;
  let fixture: ComponentFixture<CardLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardLeaderboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
