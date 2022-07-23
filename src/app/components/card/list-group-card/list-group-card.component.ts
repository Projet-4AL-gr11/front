import {Component, OnInit} from '@angular/core';
import {GroupService} from "../../../services/group/group.service";
import {firstValueFrom} from "rxjs";
import {Group} from "../../../services/models/group.model";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-list-group-card',
  templateUrl: './list-group-card.component.html',
  styleUrls: ['./list-group-card.component.css']
})
export class ListGroupCardComponent implements OnInit {

  groups: Group[] = [];

  constructor(private _groupService: GroupService,
              private _authService: AuthService) {
  }

  ngOnInit(): void {
    firstValueFrom(this._authService.actual()).then(user => {
      firstValueFrom(this._groupService.getGroupsWithUserId(user.id)).then(groups => this.groups = groups)
    })
  }

}
