import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
import {EventRankingCardComponent} from "./event-ranking-card/event-ranking-card.component";
import {EventExerciseCardComponent} from "./event-exercise-card/event-exercise-card.component";
import {LeaderboardCardComponent} from "./leaderboard-card/leaderboard-card.component";
import {CommentCardComponent} from "./comment-card/comment-card.component";
import {GroupRequestCardComponent} from "./group-request-card/group-request-card.component";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {FlexModule} from "@angular/flex-layout";
import {GroupCardComponent} from './group-card/group-card.component';
import {UserManagementGroupCardComponent} from './user-management-group-card/user-management-group-card.component';
import {ListGroupCardComponent} from './list-group-card/list-group-card.component';

@NgModule({
  declarations: [
    EventCardComponent,
    PostCardComponent,
    PostShareCardComponent,
    UserCardComponent,
    EventRankingCardComponent,
    EventExerciseCardComponent,
    LeaderboardCardComponent,
    CommentCardComponent,
    GroupRequestCardComponent,
    GroupCardComponent,
    UserManagementGroupCardComponent,
    ListGroupCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    PipesModules,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatMenuModule,
    BsDropdownModule.forRoot(),
    FlexModule,

  ],
  exports: [
    EventCardComponent,
    PostCardComponent,
    PostShareCardComponent,
    UserCardComponent,
    EventRankingCardComponent,
    EventExerciseCardComponent,
    LeaderboardCardComponent,
    CommentCardComponent,
    GroupRequestCardComponent,
    GroupCardComponent,
    BsDropdownModule,
    GroupCardComponent,
    UserManagementGroupCardComponent,
    ListGroupCardComponent

    ]
})
export class CardsModule {
}
