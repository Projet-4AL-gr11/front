import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardEventRankingComponent } from './card-event-ranking.component';

describe('CardEventRankingComponent', () => {
  let component: CardEventRankingComponent;
  let fixture: ComponentFixture<CardEventRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardEventRankingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardEventRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
