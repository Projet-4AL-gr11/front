import {Component, Input, OnInit} from '@angular/core';
import {Event} from "../../shared/models/event.model";
import {faCheckCircle, faClock, faTags, faUser} from '@fortawesome/free-solid-svg-icons';
import {UserService} from "../../../services/user/user.service";
import {EventService} from "../../../services/event/event.service";
import {AuthService} from "../../../services/auth/auth.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {

  @Input("event") event: Event = new Event();
  faCheckCircle = faCheckCircle;
  faUser = faUser;
  faClock = faClock;
  faTags = faTags;

  constructor(
    private _userService: UserService,
    private _eventService: EventService,
    private _authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.updateData();
  }

  async joinEvent(id: string) {
    firstValueFrom(this._eventService.addParticipant(id, this._authService.getCurrentUserId())).then(() => this.event.isMember = true);
  }

  leaveEvent(id: string) {
    firstValueFrom(this._eventService.removeParticipant(id, this._authService.getCurrentUserId())).then(() => this.event.isMember = false);
  }

  async canJoin() {
    // TODO: cette apelle crée une fuite de mémoire
    await firstValueFrom(this._eventService.isMember(this.event.id)).then(isMember => this.event.isMember = isMember);
    console.log(this.event.isMember)
  }

  private async getEvent() {
    this.event = await firstValueFrom(this._eventService.getEventById(this.event.id));
  }

  private updateData() {
    this.getEvent().then();
    this.canJoin().then();
  }

  isEnd(): boolean {
    return new Date(this.event.endDate) > new Date(Date.now())
  }

}
