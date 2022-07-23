import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventIdeComponent } from './event-ide.component';

describe('EventIdeComponent', () => {
  let component: EventIdeComponent;
  let fixture: ComponentFixture<EventIdeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventIdeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventIdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
