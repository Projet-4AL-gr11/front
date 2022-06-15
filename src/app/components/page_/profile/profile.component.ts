import { Component, OnInit } from '@angular/core';
import {faCheckCircle, faEllipsisH, faTimes, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {User} from "../../../shared/models/user.model";
import {FriendRequestStatus} from "../../../shared/enum/friendship_request_status.enum";
import {GroupService} from "../../../services/group/group.service";
import {AuthService} from "../../../services/auth/auth.service";
import {EventService} from "../../../services/event/event.service";
import {FriendshipService} from "../../../services/friendship/friendship.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {Title} from "@angular/platform-browser";
import {environment} from "../../../../environments/environment";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  faCheckCircle = faCheckCircle;
  faEllipsisH = faEllipsisH;
  faUserPlus = faUserPlus;
  loading: boolean = false;
  offset: number = 0;
  limit: number = 10;
  user: User;
  faTimes = faTimes;
  allFriendRequestStatus = FriendRequestStatus;

  constructor(
    public _userService: UserService,
    private route: ActivatedRoute,
    private _friendshipService: FriendshipService,
    private _eventService: EventService,
    public _authService: AuthService,
    public _groupService: GroupService,
    public dialog: MatDialog,
    public dialogReport: MatDialog,
    public dialogCreateEvent: MatDialog,
    public dialogUpdateUser: MatDialog,
    private _titleService: Title
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._titleService.setTitle(params["id"] + " - " + environment.name);
      this.updateUser(params["id"]).then();
    });
  }

  async updateUser(id: string): Promise<void> {
    this.user = await firstValueFrom(this._userService.getById(id));
    this.user.createdPosts = [];
    this.getMorePosts();
    firstValueFrom(this._userService.getFriends(id)).then(friends =>this.user.friends.push(friends)) ;
    firstValueFrom(this._eventService.getEventParticipation()).then(eventParticipation =>this.user.eventsParticipation=eventParticipation);
    firstValueFrom(this._userService.hasBlocked(id)).then(isBlocked =>this.user.isBlocked=isBlocked);
    firstValueFrom(this._friendshipService.statusFriendship(id)).then(friendshipStatus =>this.user.friendshipStatus=friendshipStatus);
    firstValueFrom(this._groupService.whereIsAdmin(id).toPromise().then(administratedGroup =>this.user.administratedGroup=administratedGroup);
  }

}
