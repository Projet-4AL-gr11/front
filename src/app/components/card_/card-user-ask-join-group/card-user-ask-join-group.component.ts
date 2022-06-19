import {Component, Input, OnInit} from '@angular/core';
import {GroupService} from "../../../services/group/group.service";
import {Group} from "../../../shared/models/group.model";
import {firstValueFrom} from "rxjs";
import {faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-user-ask-join-group',
  templateUrl: './card-user-ask-join-group.component.html',
  styleUrls: ['./card-user-ask-join-group.component.css']
})
export class CardUserAskJoinGroupComponent implements OnInit {
  @Input('group') group: Group;
  faTimes=faTimes;
  constructor(public _groupService: GroupService) {
  }

  ngOnInit(): void {
  }

  acceptRequest() {
    firstValueFrom(this._groupService.acceptGroupRequest(this.group.id)).then();
  }

  rejectRequest() {
    firstValueFrom(this._groupService.cancelGroupRequest(this.group.id)).then();
  }

}
