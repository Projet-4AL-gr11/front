import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Event} from "../../../services/models/event.model";
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

  @Input() event: Event = new Event();
  faCheckCircle = faCheckCircle;
  faUser = faUser;
  faClock = faClock;
  faTags = faTags;

  @Output() removeEventCard: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(
    private _userService: UserService,
    private _eventService: EventService,
    private _authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.updateData();
  }



  private async getEvent() {
    this.event = await firstValueFrom(this._eventService.getEventById(this.event.id));
  }

  private updateData() {
    this.getEvent().then();
  }

  isEnd(): boolean {
    return new Date(this.event.endDate) > new Date(Date.now())
  }

}
