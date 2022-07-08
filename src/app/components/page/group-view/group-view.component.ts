import {Component, OnInit} from '@angular/core';
import {Group} from "../../../services/models/group.model";
import {firstValueFrom} from "rxjs";
import {User} from "../../../services/models/user.model";
import {EventService} from "../../../services/event/event.service";
import {Post} from "../../../services/models/post.model";
import {PostService} from "../../../services/post/post.service";
import {faEllipsisH, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {GroupService} from "../../../services/group/group.service";
import {DialogReportComponent} from "../../dialog/dialog-report/dialog-report.component";
import {ReportTypeEnum} from "../../shared/enum/report_type.enum";
import {MatDialog} from "@angular/material/dialog";
import {DialogUpdateGroupComponent} from "../../dialog/dialog-update-group/dialog-update-group.component";
import {DialogCreateEventComponent} from "../../dialog/dialog-create-event/dialog-create-event.component";
import {environment} from "../../../../environments/environment";
import {AuthService} from "../../../services/auth/auth.service";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {GroupRequest} from "../../../services/models/GroupRequest.model";
import {GroupRequestStatus} from "../../shared/enum/group-request-status.enum";

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.css']
})
export class GroupViewComponent implements OnInit {

  loadingEvent: boolean = false;
  loading: boolean = false;
  group: Group;
  user: User;
  offsetEvent: number = 0;
  limitEvent: number = 10;
  offset: number = 0;
  limit: number = 10;
  faUserPlus = faUserPlus;
  faEllipsisH = faEllipsisH;
  isMember: boolean;
  groupRequestStatus: GroupRequestStatus;
  statusEnum: typeof GroupRequestStatus = GroupRequestStatus;

  constructor(private _eventService: EventService,
              private _postService: PostService,
              private _groupService: GroupService,
              private _authService: AuthService,
              private route: ActivatedRoute,
              private dialogReport: MatDialog,
              private dialogUpdateGroup: MatDialog,
              private dialogCreateEvent: MatDialog,
              private _titleService: Title
  ) {
  }

  ngOnInit(): void {
    firstValueFrom(this._authService.actual()).then(user => {
      this.user = user;
      this.route.params.subscribe(params => {
        this.updateGroup(params["groupId"]).then(() =>
          this._titleService.setTitle(this.group.name + " - " + environment.name)
        );
      });
    })

  }

  async updateGroup(id: string) {
    this.group = await firstValueFrom(this._groupService.findById(id));
    this.group.posts = [];
    this.group.events = [];
    this.group.followers = [];
    this.group.members = [];
    this.group.isAdmin = false;
    this.group.isOwner = false;
    this.group.groupRequests = [];
    this.getMorePosts();
    this.getMoreEvent();
    firstValueFrom(this._groupService.getFollowers(id)).then(users => {
      this.group.followers = (users);
      this.group.followers.forEach(user => {
        if (user.id == this.user.id) {
          this.group.isFollower = true;
        }
      });
    });
    firstValueFrom(this._groupService.getGroupMembers(id)).then(groupMembership => {
      this.group.members = (groupMembership);
      this.group.members.forEach(membership => {
        if (membership.user.id == this.user.id) {
          this.isMember = true;
        }
      })
    });
    firstValueFrom(this._groupService.isUserAdmin(id, this.user.id)).then(isAdmin => {
      this.group.isAdmin = isAdmin
    });
    firstValueFrom(this._groupService.isUserOwner(id, this.user.id)).then(isOwner => this.group.isOwner = isOwner);
    firstValueFrom(this._groupService.GetGroupRequestWithGroupId(id)).then(groupRequest => this.group.groupRequests = groupRequest);
    firstValueFrom(this._groupService.getGroupRequestStatus(this.user.id, this.group.id)).then(groupRequestStatus => {
      this.groupRequestStatus = groupRequestStatus;
    })
  }

  triggerGetMore($event) {
    if ($event.endIndex !== this.group.posts.length - 1 || this.loading) return;
    this.getMorePosts();
  }

  triggerGetMoreEvent($event) {
    if ($event.endIndex !== this.group.posts.length - 1 || this.loading) return;
    this.getMoreEvent();
  }

  getMoreEvent() {
    this.loadingEvent = true;
    firstValueFrom(this._eventService.getEventWithGroupId(this.group.id, this.limitEvent, this.offsetEvent))
      .then(events => {
        this.group.events = this.group.events.concat(events);
        this.offsetEvent += this.limitEvent;
        if (events.length > 0) {
          this.loading = false;
        }
      });
  }

  removePost(event: Post) {
    this.group.posts.splice(this.group.posts.findIndex((post: Post) => post.id === event.id));
  }

  getMorePosts() {
    this.loading = true;
    firstValueFrom(this._postService.getPostWithGroupId(this.group.id, this.limit, this.offset))
      .then(posts => {
        this.group.posts = this.group.posts.concat(posts);
        this.offset += this.limit;
        if (posts.length > 0) {
          this.loading = false;
        }
      });
  }

  followOrganisation() {
    firstValueFrom(this._groupService.addGroupFollower(this.group.id)).then(() => this.group.isFollower = true)
  }

  unfollowOrganisation() {
    firstValueFrom(this._groupService.addGroupFollower(this.group.id)).then(() => this.group.isFollower = false)
  }

  showDialogueReport() {
    const dialogRef = this.dialogReport.open(DialogReportComponent, {
      width: '500px',
      data: {id: this.user.id, reportType: ReportTypeEnum.GROUP}
    });

    dialogRef.afterClosed().subscribe(() => {
    });

  }

  showDialogueUpdateOrganisation() {
    const dialogRef = this.dialogUpdateGroup.open(DialogUpdateGroupComponent, {
      width: '500px',
      data: {group: this.group}
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  showDialogueCreateEvent() {
    const dialogRef = this.dialogCreateEvent.open(DialogCreateEventComponent, {
      width: '600px',
      data: {group: this.group}
    });

    dialogRef.afterClosed().subscribe(() => {
    });
  }


  removeGroupRequestAndJoin(groupRequest: GroupRequest) {
    this.group.groupRequests.splice(this.group.groupRequests.indexOf(groupRequest), 1)
    firstValueFrom(this._groupService.getGroupMembers(this.group.id)).then(groupMembership => {
      this.group.members = (groupMembership);
      this.group.members.forEach(membership => {
        if (membership.user.id == this.user.id) {
          this.isMember = true;
        }
      })
    });
  }

  removeGroupRequestAndLeave(groupRequest: GroupRequest) {
    this.group.groupRequests.splice(this.group.groupRequests.indexOf(groupRequest), 1)
  }

  leaveGroup() {
    firstValueFrom(this._groupService.leaveGroup(this.group.id)).then(() => {
      this.isMember = false;
    });
  }

  askJoin() {
    firstValueFrom(this._groupService.sendGroupRequest(this.group.id, this.user.id)).then(() => {
      this.groupRequestStatus = this.statusEnum.PENDING;
    })
  }

  cancelRequest() {
    firstValueFrom(this._groupService.cancelGroupRequest(this.group.id)).then(() => {
      this.groupRequestStatus = this.statusEnum.NONE;
    })
  }
}
