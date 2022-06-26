import {Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ConversationBoxDirective} from "../conversation-directive/conversation-box.directive";
import {Conversation} from "../../../services/models/conversation.model";
import {mergeMap, Subject, takeUntil} from "rxjs";
import {ConversationBoxService} from "../../../services/conversation-box/conversation-box.service";

@Component({
  selector: 'app-conversation-box',
  templateUrl: './conversation-box.component.html',
  styleUrls: ['./conversation-box.component.css'],
  animations: [
    trigger('openClose', [
      state('open', style({
        transform: 'translateY(00%)'
      })),
      state('closed', style({
        transform: 'translateY(0%)'
      })),
      transition('closed => open', [
        animate('300ms ease-out', style({transform: 'translateY(0%)'}))
      ]),
      transition('open => closed', [
        animate('300ms ease-in', style({transform: 'translateY(0%)'}))
      ])
    ])
  ]

})
export class ConversationBoxComponent implements OnInit {

  @ViewChild(ConversationBoxDirective, {static: true})
  conversationBoxDirective: ConversationBoxDirective;
  opened: boolean;
  conversations: Conversation[];
  private destroySubject = new Subject();

  constructor(public conversationBoxService: ConversationBoxService) {
  }

  ngOnInit(): void {
    const viewContainerRef = this.conversationBoxDirective.viewContainerRef;
    this.conversationBoxService.isConversationSelected$
      .pipe(
        takeUntil(this.destroySubject),
        mergeMap(isConversationSelected => this.conversationBoxService.loadComponent(viewContainerRef, isConversationSelected)))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroySubject.next(null);
    this.destroySubject.complete();
  }
}
