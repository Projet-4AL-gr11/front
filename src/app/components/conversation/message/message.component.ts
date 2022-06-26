import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../../services/models/message.model";
import {AuthService} from "../../../services/auth/auth.service";
import {firstValueFrom} from "rxjs";
import {User} from "../../../services/models/user.model";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input()
  message: Message;
  user: User;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    firstValueFrom(this.authService.actual()).then(user => this.user = user)
  }

}
