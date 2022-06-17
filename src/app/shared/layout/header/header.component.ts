import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public router: Router,
    public _authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this._authService.logout();
    this.router.navigateByUrl("/login");
  }
}
