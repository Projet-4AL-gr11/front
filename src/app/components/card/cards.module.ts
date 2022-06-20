import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PipesModules} from "../../pipes/pipes.modules";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCardModule} from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {EventCardComponent} from "./event-card/event-card.component";
import {PostComponent} from "./post/post.component";
import {PostShareCardComponent} from "./post-share-card/post-share-card.component";
import {UserCardComponent} from "./user-card/user-card.component";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    EventCardComponent,
    PostComponent,
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
    PostComponent,
    PostShareCardComponent,
    UserCardComponent,
  ]
})
export class CardsModule { }
