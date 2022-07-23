import {Component} from '@angular/core';
import {environment} from "../environments/environment";
import {Title} from "@angular/platform-browser";
import {UserService} from "./services/user/user.service";
import {AuthService} from "./services/auth/auth.service";
import {firstValueFrom} from "rxjs";
import {User} from "./services/models/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title;
  user: User;

  constructor(public _authService: AuthService,
              private userService: UserService,
              private _titleService: Title) {
    this._titleService.setTitle(environment.name);
  }

  ngOnInit(): void {
    firstValueFrom(this._authService.getCurrentUser()).then(user => this.user = user);
  }


}
