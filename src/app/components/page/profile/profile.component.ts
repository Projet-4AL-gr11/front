import {Component, OnInit} from '@angular/core';
import {faCheckCircle, faEllipsisH, faTimes, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {User} from "../../../services/models/user.model";
import {FriendRequestStatus} from "../../shared/enum/friendship_request_status.enum";
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
import {PostService} from "../../../services/post/post.service";
import {DialogReportComponent} from "../../dialog/dialog-report/dialog-report.component";
import {ReportTypeEnum} from "../../shared/enum/report_type.enum";
import {Post} from "../../../services/models/post.model";
import {DialogUpdateUserComponent} from "../../dialog/dialog-update-user/dialog-update-user.component";
import {DialogCreateEventComponent} from "../../dialog/dialog-create-event/dialog-create-event.component";
import {DialogCreateGroupComponent} from "../../dialog/dialog-create-group/dialog-create-group.component";
import {Event} from "../../../services/models/event.model";

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
  loadingEvent: boolean = false;
  offset: number = 0;
  limit: number = 10;
  offsetEvent: number = 0;
  limitEvent: number = 10;
  user: User;
  faTimes = faTimes;
  currentUser: User;
  allFriendRequestStatus = FriendRequestStatus;

  constructor(
    public _userService: UserService,
    private route: ActivatedRoute,
    private _friendshipService: FriendshipService,
    private _eventService: EventService,
    public _authService: AuthService,
    public _groupService: GroupService,
    public _postService: PostService,
    public dialog: MatDialog,
    public dialogReport: MatDialog,
    public dialogCreateEvent: MatDialog,
    public dialogUpdateUser: MatDialog,
    private _titleService: Title
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.updateUser(params["id"]).then(() =>
        this._titleService.setTitle(this.user.username + " - " + environment.name)
      );
    });
    firstValueFrom(this._authService.actual()).then(user => this.currentUser = user)
  }

  async updateUser(id: string): Promise<void> {
    this.user = await firstValueFrom(this._userService.getById(id));
    this.user.createdPosts = [];
    this.user.eventsParticipation = [];
    this.user.friends = [];
    this.user.administratedGroup = [];
    this.getMorePosts();
    this.getMoreEvent();
    firstValueFrom(this._userService.getFriends(id)).then(friends => this.user.friends = friends);
    firstValueFrom(this._userService.hasBlocked(id)).then(hasBlocked => this.user.hasBlocked = hasBlocked);
    firstValueFrom(this._userService.isBlocked(id)).then(isBlocked => this.user.isBlocked = isBlocked);
    firstValueFrom(this._friendshipService.statusFriendship(id)).then(friendshipStatus => this.user.friendshipStatus = friendshipStatus);
    firstValueFrom(this._groupService.findGroupsWithUserId(id)).then(groups => this.user.groups = groups);
  }

  getMoreEvent() {
    this.loadingEvent = true;
    firstValueFrom(this._eventService.getEventParticipation(this.user.id, this.limitEvent, this.offsetEvent))
      .then(events => {
        this.user.eventsParticipation = this.user.eventsParticipation.concat(events);
        this.offsetEvent += this.limitEvent;
        if (events.length > 0) {
          this.loading = false;
        }
      });
  }

  getMorePosts() {
    this.loading = true;
    firstValueFrom(this._postService.getUserTimeline(this.user.id, this.limit, this.offset))
      .then(posts => {
        this.user.createdPosts = this.user.createdPosts.concat(posts);
        this.offset += this.limit;
        if (posts.length > 0) {
          this.loading = false;
        }
      });
  }

  showDialogueReport() {
    const dialogRef = this.dialogReport.open(DialogReportComponent, {
      width: '500px',
      data: {id: this.user.id, reportType: ReportTypeEnum.USER}
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  showDialogueCreateEvent() {
    const dialogRef = this.dialogCreateEvent.open(DialogCreateEventComponent, {
      width: '600px',
      data: {group: null}
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  async showDialogUpdateUser() {
    const dialogRef = this.dialogUpdateUser.open(DialogUpdateUserComponent, {
      width: '600px',
      data: {user: this.user}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updateUser(this.user.id)
    })
  }

  async showDialogCreateGroup() {
    const dialogRef = this.dialogUpdateUser.open(DialogCreateGroupComponent, {
      width: '600px',
      data: {user: this.user}
    });

    dialogRef.afterClosed().subscribe(() => {
    })
  }

  removeFriend() {
    firstValueFrom(this._friendshipService.removeFriendship(this.user.id)).then(() => this.user.friendshipStatus = FriendRequestStatus.NONE);
  }

  askFriend() {
    firstValueFrom(this._friendshipService.sendFriendRequest(this.user.id)).then(() => this.user.friendshipStatus = FriendRequestStatus.PENDING);
  }

  cancelRequest() {
    firstValueFrom(this._friendshipService.cancelFriendRequest(this.user.id)).then(() => this.user.friendshipStatus = FriendRequestStatus.NONE);
  }

  delFriendshipRequest() {
    firstValueFrom(this._friendshipService.rejectFriendRequest(this.user.id)).then(() => this.user.friendshipStatus = FriendRequestStatus.NONE);

  }

  acceptFriendship() {
    firstValueFrom(this._friendshipService.acceptFriendship(this.user.id)).then(() => this.user.friendshipStatus = FriendRequestStatus.BEFRIENDED);
  }

  blockUser() {
    firstValueFrom(this._userService.blockUser(this.user.id))
      .then(() => this.user.hasBlocked = true);
  }

  unblockUser() {
    firstValueFrom(this._userService.unblockUser(this.user.id))
      .then(() => this.user.hasBlocked = false);
  }

  removePost($event: Post) {
    this.user.createdPosts = this.user.createdPosts.filter(post => post.id !== $event.id);
  }

  triggerGetMore($event) {
    if ($event.endIndex !== this.user.createdPosts.length - 1 || this.loading) return;
    this.getMorePosts();
  }

  triggerGetMoreEvent($event) {
    if ($event.endIndex !== this.user.eventsParticipation.length - 1 || this.loading) return;
    this.getMoreEvent();
  }

  sendJoinGroup(groupId: string, userId: string) {
    this._groupService.sendGroupRequest(groupId, userId);
  }

  removeFriendCard(friend: User) {
    if (this.currentUser.id == this.user.id) {
      this.user.friends.splice(this.user.friends.indexOf(friend), 1)
    }
  }

  removeEventCard($event: Event) {
    if (this.currentUser.id == this.user.id) {
      this.user.eventsParticipation.splice(this.user.eventsParticipation.indexOf($event), 1)
    }
  }
}
