import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../shared/models/user.model";
import {faCheckCircle, faUserPlus, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FriendRequestStatus} from "../../../shared/enum/friendship_request_status.enum";
import {FriendshipService} from "../../../services/friendship/friendship.service";
import {AuthService} from "../../../services/auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input()
  user: User;
  faCheckCircle = faCheckCircle;
  faUserPlus = faUserPlus;
  faTimes = faTimes;
  statusEnum: typeof FriendRequestStatus = FriendRequestStatus;

  constructor(private _friendshipService: FriendshipService,
              public _authService: AuthService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    console.log(this.user)
    this.canAdd();
  }

  canAdd() {
    firstValueFrom(this._friendshipService.statusFriendship(this.user.id))
      .then(friendshipStatus => this.user.friendshipStatus = friendshipStatus);
  }

  askFriend() {
    firstValueFrom(this._friendshipService.sendFriendRequest(this.user.id))
      .then(() => this.user.friendshipStatus = FriendRequestStatus.PENDING);
  }

  removeFriend() {
    firstValueFrom(this._friendshipService.removeFriendship(this.user.id))
      .then(() => this.user.friendshipStatus = FriendRequestStatus.NONE);
  }

  acceptFriendship() {
    firstValueFrom(this._friendshipService.acceptFriendship(this.user.id)).then(() =>{
      this.user.friendshipStatus = FriendRequestStatus.BEFRIENDED;
    })
  }

  delFriendshipRequest() {
    firstValueFrom(this._friendshipService.rejectFriendRequest(this.user.id)).then(() => {
      this.user.friendshipStatus = FriendRequestStatus.NONE;
    })
  }

  cancelRequest() {
    firstValueFrom(this._friendshipService.cancelFriendRequest(this.user.id))
      .then(() => this.user.friendshipStatus = FriendRequestStatus.NONE);
  }

}
