import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import {NotificationsRoutingModule} from "./notifications-routing.module";
import {SharedModule} from "../../../shared/shared.module";
import {MatMenuModule} from "@angular/material/menu";
import {MatRippleModule} from "@angular/material/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {UserCardModule} from "../../card_/user-card/user-card.module";
import {CardUserAskJoinGroupModule} from "../../card_/card-user-ask-join-group/card-user-ask-join-group.module";
import {MatDividerModule} from "@angular/material/divider";



@NgModule({
  declarations: [
    NotificationsComponent,
  ],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    SharedModule,
    MatMenuModule,
    MatRippleModule,
    FontAwesomeModule,
    UserCardModule,
    CardUserAskJoinGroupModule,
    MatDividerModule
  ],
  exports: [
    NotificationsComponent,
  ],
})
export class NotificationsModule { }
