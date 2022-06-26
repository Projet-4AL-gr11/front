import { ComponentFixture, TestBed } from '@angular/core/testing';
import {EventRankingCardComponent} from "./event-ranking-card.component";


describe('CardEventRankingComponent', () => {
  let component: EventRankingCardComponent;
  let fixture: ComponentFixture<EventRankingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventRankingCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRankingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
