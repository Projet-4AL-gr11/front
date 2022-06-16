import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import {ProfileComponent} from "./profile.component";
import {SharedModule} from "../../../shared/shared.module";
import {PostShareCardModule} from "../../card/post-share-card/post-share-card.module";
import {MatTabsModule} from "@angular/material/tabs";
import {VirtualScrollerModule} from "@iharbeck/ngx-virtual-scroller";
import {PipesModules} from "../../../pipes/pipes.modules";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";
import {PostModule} from "../../card/post/post.module";
import {UserCardModule} from "../../card/user-card/user-card.module";
import {DialogModule} from "../../dialog/dialog.module";


@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    // DialogModule,
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    PostShareCardModule,
    MatTabsModule,
    VirtualScrollerModule,
    PipesModules,
    FontAwesomeModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    PostModule,
    UserCardModule,
  ],
  exports: [
    ProfileComponent,
  ]
})
export class ProfileModule { }
