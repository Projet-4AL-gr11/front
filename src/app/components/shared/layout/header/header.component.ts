import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {firstValueFrom, Observable} from "rxjs";
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

  logout() {
    this._authService.logout();
    this.isConnected = false;
    this.router.navigateByUrl("/auth/login");
  }

  login() {
    this.router.navigateByUrl("/auth/login");
  }

  subscribe() {
    this.router.navigateByUrl("/auth/register");
  }
}
