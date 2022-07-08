import {AfterViewInit, Component, OnInit} from '@angular/core';
import {faAngleDown, faAngleUp, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {Conversation} from "../../../services/models/conversation.model";
import {ConversationBoxService} from "../../../services/conversation-box/conversation-box.service";
import {UserService} from "../../../services/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {ConversationService} from "../../../services/conversation/conversation.service";
import {firstValueFrom, Observable} from "rxjs";
import {
  DialogCreateConversationComponent
} from "../../dialog/dialog-create-conversation/dialog-create-conversation.component";
import {AuthService} from "../../../services/auth/auth.service";
import {User} from "../../../services/models/user.model";
import {MatSelectionListChange} from "@angular/material/list";

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit, AfterViewInit {

  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faPlusCircle = faPlusCircle;
  conversations: Observable<Conversation[]>;
  user: User;

  constructor(
    private conversationService: ConversationService,
    private authService: AuthService,
    public conversationBoxService: ConversationBoxService,
    private userService: UserService,
    private matDialog: MatDialog) {
  }


  async ngOnInit(): Promise<void> {
  }

  openCreateGroupDialog() {
    this.matDialog.open(DialogCreateConversationComponent, {
      minWidth: "500px",
      minHeight: "121px",
      data: {user: this.user}
    });
  }

  ngOnDestroy(): void {
  }

  async ngAfterViewInit(): Promise<void> {
    this.conversationService.getConversations()
    this.conversations = await this.conversationService.getUserConversations();

  }

  onSelectConversation($event: MatSelectionListChange) {
    this.conversationBoxService.selectConversation($event.source.selectedOptions.selected[0].value)
  }

  getConversations() {
    this.conversationService.getConversations()
  }

  onOpenConversations() {
    this.conversationBoxService.opened = !this.conversationBoxService.opened
    this.getConversations()
    firstValueFrom(this.authService.actual()).then(user => this.user = user)
  }
}
