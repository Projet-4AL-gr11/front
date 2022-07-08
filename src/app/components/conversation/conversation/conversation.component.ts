import {Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Message} from "../../../services/models/message.model";
import {faAngleDown, faAngleUp, faPaperPlane, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Conversation} from "../../../services/models/conversation.model";
import {User} from "../../../services/models/user.model";
import {AuthService} from "../../../services/auth/auth.service";
import {ConversationBoxService} from "../../../services/conversation-box/conversation-box.service";
import {ConversationService} from "../../../services/conversation/conversation.service";
import {MatDialog} from "@angular/material/dialog";
import {combineLatest, firstValueFrom, map, Observable, startWith} from "rxjs";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  @ViewChild('scroll', {static: false}) scrollFrame: ElementRef;
  @Input()
  conversation: Conversation;
  message: string;
  faPaperPlane = faPaperPlane;
  faTimes = faTimes;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  user: User;
  private isNearBottom = true;
  private scroll: any;
  tchatMessage: FormControl;

  messages: Observable<Message[]> = combineLatest([ this.conversationService.getMessages(), this.conversationService.getAddedMessage().pipe(startWith(null))]).pipe(
    map(([messages, messagesAdded]) => {
      if (messagesAdded && messagesAdded.conversation.id == this.conversation.id) {
        messages.push(messagesAdded)
      }
      messages = messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      return messages;
    }));

  constructor(
    private _authService: AuthService,
    public conversationBoxService: ConversationBoxService,
    private conversationService: ConversationService,
  ) {
  }

  ngOnDestroy(): void {
    this.conversationService.leaveConversation(this.conversation)

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.conversationService.leaveConversation(changes['conversation'].previousValue);
    if (this.conversation) {
      this.conversationService.joinConversation(this.conversation);
    }
  }

  ngOnInit(): void {
    this.tchatMessage = new FormControl(null, [Validators.required])
    this.conversation = this.conversationBoxService.selectedConversation;
      this.conversationService.joinConversation(this.conversation);
  }

  ngAfterViewInit() {
    this.scroll = this.scrollFrame?.nativeElement;

  }


  getConversationName(): string {
    if (this.conversation.group) {
      return this.conversation.group.name;
    } else if (this.conversation.friendship) {
      if (this.conversation.friendship.friendOne.username) {
        return this.conversation.friendship.friendOne.username;
      }
      return this.conversation.friendship.friendTwo.username;
    } else if (this.conversation.users) {
      return this.conversation.users[0].username + " et autres..."
    }
    return undefined;
  }

  leaveConversation() {
    this.conversationBoxService.unselectConversation();
  }

  sendMessage() {
    this.conversationService.sendMessage({content: this.tchatMessage.value, conversation: this.conversation });
    this.tchatMessage.reset()
    this.scrollToBottom()
  }

  private scrollToBottom() {
    this.isNearBottom = this.isUserNearBottom();
    if (this.isNearBottom) {
      this.scroll.scroll({
        top: this.scroll.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
  private isUserNearBottom(): boolean {
    const threshold = 5;
    const position = this.scroll.scrollTop + this.scroll.offsetHeight;
    const height = this.scroll.scrollHeight;
    return position > height - threshold;
  }
}
