import { Component } from '@angular/core';
import {environment} from "../environments/environment";
import {Title} from "@angular/platform-browser";
import {UserService} from "./services/user/user.service";
import {AuthService} from "./services/auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title;

  constructor(public authService: AuthService,
              private userService: UserService,
              private _titleService: Title) {
    this._titleService.setTitle(environment.name);
  }
}
