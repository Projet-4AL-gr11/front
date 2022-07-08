import { Component, OnInit } from '@angular/core';
import {faBell} from '@fortawesome/free-solid-svg-icons';
import {GroupService} from "../../../services/group/group.service";
import {FriendshipService} from "../../../services/friendship/friendship.service";
import {firstValueFrom} from "rxjs";
import {GroupRequest} from "../../../services/models/GroupRequest.model";
import {FriendRequest} from "../../../services/models/friend_request.model";
import {AuthService} from "../../../services/auth/auth.service";
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../services/models/user.model";
import {Group} from "../../../services/models/group.model";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  faBell = faBell;
  groupRequests: GroupRequest[];
  groupRequestsAdmin: GroupRequest[];
  friendshipRequestReceived: FriendRequest[];
  friendshipRequestSent: FriendRequest[];

  constructor(public _groupService: GroupService,
              public _authService: AuthService,
              public _userService: UserService,
              public _friendshipService: FriendshipService) {}

  ngOnInit(): void {
    firstValueFrom(this._groupService.getGroupRequest()).then(groupRequest => this.groupRequests = groupRequest);
    firstValueFrom(this._groupService.getGroupRequestWhereAdmin()).then(groupRequestAdmin => this.groupRequestsAdmin = groupRequestAdmin);
    firstValueFrom(this._friendshipService.receivedFriendshipRequest()).then(friendshipRequest => this.friendshipRequestReceived = friendshipRequest);
    firstValueFrom(this._friendshipService.sentFriendshipRequest()).then(friendshipRequest => this.friendshipRequestSent = friendshipRequest);
  }

  removeCard(event: GroupRequest) {
    this.groupRequestsAdmin.splice(this.groupRequestsAdmin.indexOf(event), 1)
  }

  removeReceiveFriendshipRequest(event: FriendRequest) {
    this.friendshipRequestReceived.splice(this.friendshipRequestReceived.indexOf(event), 1)
  }

  removeSentFriendshipRequest(request: FriendRequest) {
    this.friendshipRequestSent.splice(this.friendshipRequestSent.indexOf(request), 1)
  }

  removeSentGroupRequest(request: GroupRequest) {
    this.groupRequests.splice(this.groupRequests.indexOf(request), 1)
  }
}
