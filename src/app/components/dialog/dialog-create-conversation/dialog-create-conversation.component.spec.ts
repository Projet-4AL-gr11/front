import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DialogCreateConversationComponent} from './dialog-create-conversation.component';

describe('DialogCreateConversationComponent', () => {
  let component: DialogCreateConversationComponent;
  let fixture: ComponentFixture<DialogCreateConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCreateConversationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreateConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
