import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Conversation} from "../../../services/models/conversation.model";
import {AuthService} from "../../../services/auth/auth.service";
import {GroupService} from "../../../services/group/group.service";
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons';
import {combineLatest, map, Observable, startWith} from "rxjs";
import {Message} from "../../../services/models/message.model";
import {ConversationService} from "../../../services/conversation/conversation.service";
import {ConversationBoxService} from "../../../services/conversation-box/conversation-box.service";
import {Media} from "../../../services/models/media.model";

@Component({
  selector: 'app-conversation-card',
  templateUrl: './conversation-card.component.html',
  styleUrls: ['./conversation-card.component.css']
})
export class ConversationCardComponent implements OnChanges {
  @Input()
  conversation: Conversation;
  faEllipsisH = faEllipsisH;

  messages: Observable<Message[]> = combineLatest([ this.conversationService.getMessages(), this.conversationService.getAddedMessage().pipe(startWith(null))]).pipe(
    map(([messages, messagesAdded]) => {
      if (messagesAdded && messagesAdded.conversation.id == this.conversation.id) {
        messages = messages.concat(messagesAdded)
      }
      messages = messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      return messages;
    }));

  constructor(private conversationBoxService: ConversationBoxService,
              private authService: AuthService,
              private conversationService: ConversationService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.conversationService.leaveConversation(changes['conversation'].previousValue);
    if (this.conversation) {
      this.conversationService.joinConversation(this.conversation);
    }
  }

  ngOnDestroy(): void {

    this.conversationService.leaveConversation(this.conversation)
  }

  onConversationSelect() {
    this.conversationBoxService.selectConversation(this.conversation);
  }

  getPicture(): Media | undefined {
    if (this.conversation.friendship) {
      if (this.conversation.friendship.friendOne.username !== this.authService.getCurrentUsername()) {
        return this.conversation.friendship.friendOne?.profilePicture;
      }
      return this.conversation.friendship.friendTwo?.profilePicture;
    }
    return undefined;
  }

  getName(): string | undefined {
    if (this.conversation.group) {
      return this.conversation.group.name;
    } else if (this.conversation.friendship) {
      if (this.conversation.friendship.friendOne.username !== this.authService.getCurrentUsername()) {
        return this.conversation.friendship.friendOne.username;
      }
      return this.conversation.friendship.friendTwo.username;
    }
    return undefined;
  }
}
