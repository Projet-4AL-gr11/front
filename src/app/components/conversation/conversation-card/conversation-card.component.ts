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
import {User} from "../../../services/models/user.model";

@Component({
  selector: 'app-conversation-card',
  templateUrl: './conversation-card.component.html',
  styleUrls: ['./conversation-card.component.css']
})
export class ConversationCardComponent {
  @Input()
  conversation: Conversation;
  @Input()
  currentUser: User;
  faEllipsisH = faEllipsisH;

  constructor(private conversationBoxService: ConversationBoxService,
              private authService: AuthService,
              private conversationService: ConversationService
  ) {
  }

  onConversationSelect() {
    this.conversationBoxService.selectConversation(this.conversation);
  }

  getPicture(): Media | undefined {
    if (this.conversation.friendship) {
      if (this.conversation.friendship.friendOne.username !== this.currentUser?.username) {
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
      if (this.conversation.friendship.friendOne.username !== this.currentUser?.username) {
        return this.conversation.friendship.friendOne.username;
      }
      return this.conversation.friendship.friendTwo.username;
    }
    return undefined;
  }
}
