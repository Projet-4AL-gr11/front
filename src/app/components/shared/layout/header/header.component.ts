import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {firstValueFrom, Observable} from "rxjs";
import {Router} from "@angular/router";
import {User} from "../../models/user.model";
import {GroupService} from "../../../services/group/group.service";
import {FriendshipService} from "../../../services/friendship/friendship.service";
import {faBell} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;
  notificationCount: number = 0;
  faBell = faBell;

  constructor(
    public router: Router,
    public _authService: AuthService,
    public _groupService: GroupService,
    public _friendshipService: FriendshipService
  ) { }

  ngOnInit(): void {
    firstValueFrom(this._authService.getCurrentUser()).then(user => this.user = user);
    firstValueFrom(this._groupService.getGroupRequest()).then(groupRequest => this.notificationCount += groupRequest.length);
    firstValueFrom(this._friendshipService.receivedFriendshipRequest()).then(friendshipRequest => this.notificationCount += friendshipRequest.length);
  }

  logout() {
    this._authService.logout();
    this.router.navigateByUrl("/login");
  }
}
