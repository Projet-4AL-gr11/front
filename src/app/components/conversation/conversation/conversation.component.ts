import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Message} from "../../../services/models/message.model";
import {faAngleDown, faAngleUp, faPaperPlane, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Conversation} from "../../../services/models/conversation.model";
import {User} from "../../../services/models/user.model";
import {AuthService} from "../../../services/auth/auth.service";
import {ConversationBoxService} from "../../../services/conversation-box/conversation-box.service";
import {ConversationService} from "../../../services/conversation/conversation.service";
import {MatDialog} from "@angular/material/dialog";
import {firstValueFrom} from "rxjs";
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
  tchatMessage: FormControl = new FormControl(null, [Validators.required])

  constructor(
    private _authService: AuthService,
    public conversationBoxService: ConversationBoxService,
    private conversationService: ConversationService,
  ) {
  }

  ngOnDestroy(): void {
    firstValueFrom(this._authService.user).then(user => this.user = user)

  }

  ngOnInit(): void {
    this.conversation = this.conversationBoxService.selectedConversation;
  }

  ngAfterViewInit() {
    this.scroll = this.scrollFrame.nativeElement;

  }


  getConversationName(): string {
    if (this.conversation.group) {
      return this.conversation.group.name;
    } else if (this.conversation.friendship) {
      return this.conversation.friendship.friendOne.username !== this._authService.getCurrentUsername() ? this.conversation.friendship.friendOne.username : this.conversation.friendship.friendTwo.username;
    }
    return undefined;
  }

  leaveConversation() {
    this.conversationBoxService.unselectConversation();
  }

  sendMessage() {
    this.conversationService.sendMessage({content: this.tchatMessage.value, conversation: this.conversation });
    this.tchatMessage.reset()
  }

  private isUserNearBottom(): boolean {
    const threshold = 5;
    const position = this.scroll.scrollTop + this.scroll.offsetHeight;
    const height = this.scroll.scrollHeight;
    return position > height - threshold;
  }
}
