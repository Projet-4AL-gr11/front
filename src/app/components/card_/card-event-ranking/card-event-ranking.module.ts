import {NgModule} from "@angular/core";
import {CardLeaderboardComponent} from "../card-leaderbord/card-leaderboard.component";
import {CommonModule} from "@angular/common";
import {LeaderboardRoutingModule} from "../../../leaderboard/leaderboard-routing.module";
import {SharedModule} from "../../../shared/shared.module";
import {CardEventRankingComponent} from "./card-event-ranking.component";

@NgModule({
  declarations: [
    CardEventRankingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

  ],
  exports: [
    CardEventRankingComponent,
  ]
})
export class CardEventRankingModule { }
