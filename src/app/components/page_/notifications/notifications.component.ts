import { Component, OnInit } from '@angular/core';
import {faBell} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../../services/auth/auth.service";
import {GroupService} from "../../../services/group/group.service";
import {FriendshipService} from "../../../services/friendship/friendship.service";
import {firstValueFrom} from "rxjs";
import {GroupRequest} from "../../../shared/models/GroupRequest.model";
import {FriendRequest} from "../../../shared/models/friend_request.model";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  faBell = faBell;
  groupRequests: GroupRequest[];
  friendshipRequestReceived: FriendRequest[];
  friendshipRequestSent: FriendRequest[];

  constructor(public _groupService: GroupService,
              public _friendshipService: FriendshipService) {}

  ngOnInit(): void {
    firstValueFrom(this._groupService.getGroupRequest()).then(groupRequest => this.groupRequests = groupRequest);
    firstValueFrom(this._friendshipService.receivedFriendshipRequest()).then(friendshipRequest => this.friendshipRequestReceived = friendshipRequest);
    firstValueFrom(this._friendshipService.sentFriendshipRequest()).then(friendshipRequest => this.friendshipRequestSent = friendshipRequest);
  }

}
