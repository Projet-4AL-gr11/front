import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import {NotificationsRoutingModule} from "./notifications-routing.module";
import {MatMenuModule} from "@angular/material/menu";
import {MatRippleModule} from "@angular/material/core";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatDividerModule} from "@angular/material/divider";
import {CardsModule} from "../../card/cards.module";
import {SharedModule} from "../../shared/shared.module";



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
    MatDividerModule,
    CardsModule,
  ],
  exports: [
    NotificationsComponent,
  ],
})
export class NotificationsModule { }
