import {ComponentFixture, TestBed} from '@angular/core/testing';
import {GroupRequestCardComponent} from "./group-request-card.component";


describe('CardUserAskJoinGroupComponent', () => {
  let component: GroupRequestCardComponent;
  let fixture: ComponentFixture<GroupRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupRequestCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
