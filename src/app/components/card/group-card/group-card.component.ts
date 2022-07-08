import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Group} from "../../../services/models/group.model";
import {User} from "../../../services/models/user.model";
import {firstValueFrom} from "rxjs";
import {AuthService} from "../../../services/auth/auth.service";
import {GroupRequestStatus} from "../../shared/enum/group-request-status.enum";
import {GroupService} from "../../../services/group/group.service";
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.css']
})
export class GroupCardComponent implements OnInit {

  @Input()
  group: Group;
  currentUser: User;
  groupRequestStatus: GroupRequestStatus;
  statusEnum: typeof GroupRequestStatus = GroupRequestStatus;
  faUserPlus = faUserPlus;

  @Output() removeGroupCard: EventEmitter<Group> = new EventEmitter<Group>();

  constructor(private _authService: AuthService,
              private _groupService: GroupService) {
  }

  ngOnInit(): void {
    firstValueFrom(this._authService.actual()).then(user => {
      this.currentUser = user;
      firstValueFrom(this._groupService.getGroupRequestStatus(user.id, this.group.id)).then(groupRequestStatus => {
        this.groupRequestStatus = groupRequestStatus;
      })
    })
  }

  askJoin() {
    firstValueFrom(this._groupService.sendGroupRequest(this.group.id, this.currentUser.id)).then(() => {
      this.groupRequestStatus = this.statusEnum.PENDING;
    })
  }

  cancelRequest() {
    firstValueFrom(this._groupService.cancelGroupRequest(this.group.id)).then(() => {
      this.groupRequestStatus = this.statusEnum.NONE;
      this.removeGroupCard.emit(this.group);
    })
  }
}
