import {AfterViewInit, Component, OnInit} from '@angular/core';
import {faAngleDown, faAngleUp, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {Conversation} from "../../../services/models/conversation.model";
import {ConversationBoxService} from "../../../services/conversation-box/conversation-box.service";
import {UserService} from "../../../services/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {ConversationService} from "../../../services/conversation/conversation.service";
import {firstValueFrom, Subscription} from "rxjs";
import {
  DialogCreateConversationComponent
} from "../../dialog/dialog-create-conversation/dialog-create-conversation.component";
import {AuthService} from "../../../services/auth/auth.service";
import {User} from "../../../services/models/user.model";

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit, AfterViewInit {

  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faPlusCircle = faPlusCircle;
  conversations: Conversation[];
  user: User;

  constructor(
    private conversationService: ConversationService,
    private authService: AuthService,
    public conversationBoxService: ConversationBoxService,
    private userService: UserService,
    private matDialog: MatDialog) {
  }


  async ngOnInit(): Promise<void> {
    firstValueFrom(this.authService.user).then(user =>{
      this.user = user;
    } )
    firstValueFrom(await this.conversationService.getUserConversations()).then(conversations => {
      this.conversations = conversations;
      if (conversations != null) {
        this.conversationBoxService.selectConversation(conversations[0])
      }
    });
  }

  openCreateGroupDialog() {
      this.matDialog.open(DialogCreateConversationComponent, {minWidth: "500px", minHeight: "121px", data: {user: this.user}});
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
  }
}
