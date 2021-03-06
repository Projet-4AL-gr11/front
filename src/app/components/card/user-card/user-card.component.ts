import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../services/models/user.model";
import {faCheckCircle, faTimes, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {FriendRequestStatus} from "../../shared/enum/friendship_request_status.enum";
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
  currentUser: User;
  faCheckCircle = faCheckCircle;
  faUserPlus = faUserPlus;
  faTimes = faTimes;
  statusEnum: typeof FriendRequestStatus = FriendRequestStatus;

  @Output() removeUser: EventEmitter<User> = new EventEmitter<User>();

  constructor(private _friendshipService: FriendshipService,
              public _authService: AuthService,
              public dialog: MatDialog) {
  }

  async ngOnInit(): Promise<void> {
    firstValueFrom(this._authService.actual()).then(user => this.currentUser = user)
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
      .then(() => {
        this.user.friendshipStatus = FriendRequestStatus.NONE;
      });
  }

  acceptFriendship() {
    firstValueFrom(this._friendshipService.acceptFriendship(this.user.id)).then(() => {
      this.user.friendshipStatus = FriendRequestStatus.BEFRIENDED;
      this.removeUser.emit(this.user);
    })
  }

  delFriendshipRequest() {
    firstValueFrom(this._friendshipService.rejectFriendRequest(this.user.id)).then(() => {
      this.user.friendshipStatus = FriendRequestStatus.NONE;
      this.removeUser.emit(this.user);
    })
  }

  cancelRequest() {
    firstValueFrom(this._friendshipService.cancelFriendRequest(this.user.id))
      .then(() => {
        this.user.friendshipStatus = FriendRequestStatus.NONE
        this.removeUser.emit(this.user);
      });
  }

}
