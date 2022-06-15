import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import {ProfileComponent} from "./profile.component";
import {SharedModule} from "../../../shared/shared.module";
import {DialogUpdateUserModule} from "../../dialog_/dialog-update-user/dialog-update-user.module";
import {DialogCreateEventModule} from "../../dialog_/dialog-create-event/dialog-create-event.module";
import {PostShareCardModule} from "../../card_/post-share-card/post-share-card.module";
import {DialogReportModule} from "../../dialog_/dialog-report/dialog-report.module";


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
        DialogReportModule
    ],
  exports: [
    ProfileComponent,
  ]
})
export class ProfileModule { }
