import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserManagementGroupCardComponent} from './user-management-group-card.component';

describe('UserManagementGroupComponent', () => {
  let component: UserManagementGroupCardComponent;
  let fixture: ComponentFixture<UserManagementGroupCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserManagementGroupCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementGroupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
