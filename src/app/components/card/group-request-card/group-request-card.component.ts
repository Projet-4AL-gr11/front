import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GroupService} from "../../../services/group/group.service";
import {Group} from "../../../services/models/group.model";
import {firstValueFrom} from "rxjs";
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {User} from "../../../services/models/user.model";
import {GroupRequest} from "../../../services/models/GroupRequest.model";

@Component({
  selector: 'app-card-user-ask-join-group',
  templateUrl: './group-request-card.component.html',
  styleUrls: ['./group-request-card.component.css']
})
export class GroupRequestCardComponent implements OnInit {
  @Input()
  groupRequest: GroupRequest;
  faTimes=faTimes;

  @Output() removeCardJoin: EventEmitter<GroupRequest> = new EventEmitter<GroupRequest>();
  @Output() removeCardRefuse: EventEmitter<GroupRequest> = new EventEmitter<GroupRequest>();

  constructor(public _groupService: GroupService) {
  }

  ngOnInit(): void {
  }

  acceptRequest() {
    firstValueFrom(this._groupService.acceptGroupRequest(this.groupRequest.group.id, this.groupRequest.user.id)).then(() => {
      this.removeCardJoin.emit()
    });
  }

  rejectRequest() {
    firstValueFrom(this._groupService.cancelGroupRequestAdmin(this.groupRequest.group.id, this.groupRequest.user.id)).then(() => {
      this.removeCardRefuse.emit(this.groupRequest)
    });
  }

}
