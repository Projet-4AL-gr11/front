import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PipesModules} from "../../pipes/pipes.modules";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {EventCardComponent} from "./event-card/event-card.component";
import {PostShareCardComponent} from "./post-share-card/post-share-card.component";
import {UserCardComponent} from "./user-card/user-card.component";
import {RouterModule} from "@angular/router";
import {PostCardComponent} from "./post-card/post-card.component";

@NgModule({
  declarations: [
    EventCardComponent,
    PostCardComponent,
    PostShareCardComponent,
    UserCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    PipesModules,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatMenuModule
  ],
  exports: [
    EventCardComponent,
    PostCardComponent,
    PostShareCardComponent,
    UserCardComponent,
  ]
})
export class CardsModule { }
