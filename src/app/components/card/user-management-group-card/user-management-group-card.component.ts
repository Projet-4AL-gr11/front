import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../services/models/user.model";
import {Group} from "../../../services/models/group.model";
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {FriendRequestStatus} from "../../shared/enum/friendship_request_status.enum";
import {FriendshipService} from "../../../services/friendship/friendship.service";
import {AuthService} from "../../../services/auth/auth.service";
import {UserService} from "../../../services/user/user.service";
import {GroupService} from "../../../services/group/group.service";
import {MatDialog} from "@angular/material/dialog";
import {environment} from "../../../../environments/environment";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-user-management-group-card',
  templateUrl: './user-management-group-card.component.html',
  styleUrls: ['./user-management-group-card.component.css']
})
export class UserManagementGroupCardComponent implements OnInit {

  @Input('user') user: User = new User();
  @Input('group') group: Group;
  @Input('isOwner') isOwner: boolean;
  faUserPlus = faUserPlus;
  friendshipRequest: FriendRequestStatus;
  userIsAdmin: boolean = false;
  allFriendRequestStatus = FriendRequestStatus;
  userIsOwner: Boolean = false;

  @Output() removeUser: EventEmitter<User> = new EventEmitter<User>();

  constructor(private _friendshipService: FriendshipService,
              public _authService: AuthService,
              private _userService: UserService,
              private _groupService: GroupService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.canAddFriend();
    this.getStatusUserInGroup();
  }

  canAddFriend() {
    this._friendshipService.statusFriendship(this.user.id).subscribe({
      next: requestStatus => {
        this.friendshipRequest = requestStatus;
      }
    })
  }

  askFriend() {
    this._friendshipService.sendFriendRequest(this.user.id).subscribe({
      next: () => {
        this.friendshipRequest = this.allFriendRequestStatus.PENDING;
      },
      error: err => {
        if (!environment.production) {
          console.log(err)
        }
      }
    });
  }

  dellFriend() {
    this._friendshipService.removeFriendship(this.user.id).subscribe({
      next: () => {
        this.friendshipRequest = this.allFriendRequestStatus.NONE;
      },
      error: err => {
        if (!environment.production) {
          console.log(err)
        }
      }
    })
  }

  deleteMembership(userId: string) {
    this._groupService.removeUser(this.group.id, userId).subscribe({
      next: () => {
        this.removeUser.emit(this.user);
      },
      error: err => {
        if (!environment.production) {
          console.log(err);
        }
      }
    });
  }

  giveAdmin(userId: string) {
    this._groupService.giveAdminRight( this.group.id, userId).subscribe({
      next: () => {
        this.userIsAdmin = true;
      },
      error: err => {
        if (!environment.production) {
          console.log(err);
        }
      }
    });
  }

  removeAdmin(userId: string) {
    this._groupService.removeAdminRight(this.group.id, userId).subscribe({
      next: () => {
        this.userIsAdmin = false;
      },
      error: err => {
        if (!environment.production) {
          console.log(err);
        }
      }
    });
  }

  private getStatusUserInGroup() {
    this._groupService.isUserAdmin(this.group.id, this.user.id).subscribe({
      next: bool => {
        this.userIsAdmin = bool;
      },
      error: err => {
        if (!environment.production) {
          console.log(err)
        }
      }
    })
    if (!this.isOwner) {
      this._groupService.isUserOwner(this.group.id, this.user.id).subscribe({
        next: bool => {
          this.userIsOwner = bool;
        },
        error: err => {
          if (!environment.production) {
            console.log(err)
          }
        }
      })
    }
  }

  acceptFriendship() {
    this._friendshipService.acceptFriendship(this.user.id).subscribe({
      next: () => {
        this.friendshipRequest = FriendRequestStatus.BEFRIENDED;
      },
      error: err => {
        if (!environment.production) {
          console.log(err);
        }
      }
    });
  }

  delFriendshipRequest() {
    this._friendshipService.rejectFriendRequest(this.user.id).subscribe({
      next: () => {
        this.friendshipRequest = FriendRequestStatus.NONE;
      },
      error: err => {
        if (!environment.production) {
          console.log(err);
        }
      }
    })
  }

  cancelRequest() {
    firstValueFrom(this._friendshipService.cancelMyFriendRequest(this.user.id))
      .then(() => this.friendshipRequest = FriendRequestStatus.NONE);
  }
}
