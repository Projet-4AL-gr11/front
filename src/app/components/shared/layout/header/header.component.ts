import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {firstValueFrom} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../../../../services/models/user.model";
import {faBell} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../../../services/auth/auth.service";
import {GroupService} from "../../../../services/group/group.service";
import {FriendshipService} from "../../../../services/friendship/friendship.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

  user: User;
  notificationCount: number = 0;
  faBell = faBell;
  isConnected: boolean = false;

  constructor(
    public router: Router,
    public _authService: AuthService,
    public _groupService: GroupService,
    public _friendshipService: FriendshipService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    firstValueFrom(this._authService.getCurrentUser()).then(user => this.user = user);
    firstValueFrom(this._groupService.getGroupRequestWhereAdmin()).then(groupRequest => this.notificationCount += groupRequest.length);
    firstValueFrom(this._friendshipService.receivedFriendshipRequest()).then(friendshipRequest => this.notificationCount += friendshipRequest.length);
  }

  ngOnInit(): void {
    firstValueFrom(this._authService.getCurrentUser()).then(user => this.user = user);
    firstValueFrom(this._groupService.getGroupRequestWhereAdmin()).then(groupRequest => this.notificationCount += groupRequest.length);
    firstValueFrom(this._friendshipService.receivedFriendshipRequest()).then(friendshipRequest => this.notificationCount += friendshipRequest.length);
  }

  async logout() {
    firstValueFrom(await this._authService.logout()).then();
    this.isConnected = false;
    await this.router.navigateByUrl("/auth/login");
  }

  goToHome() {
    this.router.navigateByUrl("/timeline");
  }

  goToCode() {
    this.router.navigateByUrl("/code/select");
  }

  goToProfile() {

    this.router.navigateByUrl("/profile/" + this.user?.id);
  }

  goToNotification() {
    this.router.navigateByUrl("/notifications");
  }

  goToCreateExerciseTemplate() {
    this.router.navigateByUrl("/admin/listExerciseTemplate")
  }
}
