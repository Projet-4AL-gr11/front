import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {firstValueFrom, Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;

  constructor(
    public router: Router,
    public _authService: AuthService
  ) { }

  ngOnInit(): void {
    firstValueFrom(this._authService.getCurrentUser()).then(user => this.user = user)
  }

  logout() {
    this._authService.logout();
    this.router.navigateByUrl("/login");
  }
}
