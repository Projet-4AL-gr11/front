import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import {ProfileComponent} from "./profile.component";
import {PostShareCardModule} from "../../card_/post-share-card/post-share-card.module";
import {MatTabsModule} from "@angular/material/tabs";
import {VirtualScrollerModule} from "@iharbeck/ngx-virtual-scroller";
import {PipesModules} from "../../../pipes/pipes.modules";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";
import {PostModule} from "../../card_/post/post.module";
import {UserCardModule} from "../../card_/user-card/user-card.module";
import {SharedModule} from "../../../components/shared/shared.module";


@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
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
