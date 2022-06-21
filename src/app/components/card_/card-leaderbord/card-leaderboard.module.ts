import {NgModule} from "@angular/core";
import {CardUserAskJoinGroupComponent} from "../card-user-ask-join-group/card-user-ask-join-group.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PipesModules} from "../../../pipes/pipes.modules";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {LeaderboardComponent} from "../../../leaderboard/leaderboard.component";
import {LeaderboardRoutingModule} from "../../../leaderboard/leaderboard-routing.module";
import {SharedModule} from "../../../shared/shared.module";
import {CardLeaderboardComponent} from "./card-leaderboard.component";

@NgModule({
  declarations: [
    CardLeaderboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

  ],
  exports: [
    CardLeaderboardComponent,
  ]
})
export class CardLeaderboardModule { }
