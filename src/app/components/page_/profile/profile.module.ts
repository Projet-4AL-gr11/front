import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import {ProfileComponent} from "./profile.component";
import {SharedModule} from "../../../shared/shared.module";
import {DialogUpdateUserModule} from "../../dialog_/dialog-update-user/dialog-update-user.module";
import {DialogCreateEventModule} from "../../dialog_/dialog-create-event/dialog-create-event.module";
import {PostShareCardModule} from "../../card_/post-share-card/post-share-card.module";
import {DialogReportModule} from "../../dialog_/dialog-report/dialog-report.module";
import {MatTabsModule} from "@angular/material/tabs";
import {VirtualScrollerModule} from "@iharbeck/ngx-virtual-scroller";
import {PipesModules} from "../../../pipes/pipes.modules";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";
import {PostModule} from "../../card_/post/post.module";
import {DialogCreateGroupComponent} from "../../dialog_/dialog-create-group/dialog-create-group.component";
import {DialogCreateGroupModule} from "../../dialog_/dialog-create-group/dialog-create-group.module";
import {UserCardModule} from "../../card_/user-card/user-card.module";


@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    DialogUpdateUserModule,
    DialogCreateEventModule,
    PostShareCardModule,
    DialogReportModule,
    MatTabsModule,
    VirtualScrollerModule,
    PipesModules,
    FontAwesomeModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    PostModule,
    DialogCreateGroupModule,
    UserCardModule,
  ],
  exports: [
    ProfileComponent,
  ]
})
export class ProfileModule { }
