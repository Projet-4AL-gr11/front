import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {Event} from "../../../../services/models/event.model";
import {EventService} from "../../../../services/event/event.service";
import {DialogCreatePostComponent} from "../../../dialog/dialog-create-post/dialog-create-post.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogCreateEventComponent} from "../../../dialog/dialog-create-event/dialog-create-event.component";

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.css']
})
export class LanguageSelectComponent implements OnInit {
  @Output() eventSend: EventEmitter<any> = new EventEmitter<any>();
  languages = ['Python', 'JavaScript'];
  events: Event[];
  timeLeft = Date.now();

  constructor(
    public router: Router,
    public eventService: EventService,
    public dialogReport: MatDialog,
) { }

  ngOnInit(): void {
    this.eventService.getAllEvent().subscribe( res => {
      this.events = res;
    });
  }

  goToSendBox() {
    this.router.navigateByUrl("/code/sandbox");
  }

  openPopup() {
    const event = this.dialogReport.open(DialogCreateEventComponent, {minWidth: "500px", minHeight: "121px", data: {}});
    event.afterClosed().subscribe(() => {
      this.eventSend.emit()
    })
  }
}
