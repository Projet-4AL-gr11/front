import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Event} from "../../../../services/models/event.model";
import {EventService} from "../../../../services/event/event.service";

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.css']
})
export class LanguageSelectComponent implements OnInit {

  languages = ['Python', 'JavaScript'];
  events: Event[];
  timeLeft = Date.now();

  constructor(
    public router: Router,
    public eventService: EventService,
  ) { }

  ngOnInit(): void {
    this.eventService.getAllEvent().subscribe( res => {
      this.events = res;
    });
  }

  goToSendBox() {
    this.router.navigateByUrl("/code/sandbox");
  }
}
