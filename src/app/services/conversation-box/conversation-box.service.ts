import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {Conversation} from "../models/conversation.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConversationBoxService {

  selectedConversation: Conversation;
  opened: boolean = false;
  private isConversationSelected = new BehaviorSubject(false);
  isConversationSelected$ = this.isConversationSelected.asObservable();

  constructor(private cfr: ComponentFactoryResolver) {
  }

  async loadComponent(vcr: ViewContainerRef, isConversationSelected: boolean) {
    vcr.clear();
    const {ConversationComponent} = await import('../../components/conversation/conversation/conversation.component');

    const {ConversationListComponent} = await import('../../components/conversation/conversation-list/conversation-list.component');
    let component: any = isConversationSelected ? ConversationComponent : ConversationListComponent;
    return vcr.createComponent(this.cfr.resolveComponentFactory(component));
  }

  selectConversation(conversation: Conversation) {
    this.selectedConversation = conversation;
    this.isConversationSelected.next(true);
  }

  unselectConversation() {
    this.selectedConversation = undefined;
    this.isConversationSelected.next(false);
  }
}
