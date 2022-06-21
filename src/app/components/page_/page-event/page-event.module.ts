import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageEventComponent } from './page-event.component';
import {PageEventRoutingModule} from "./page-event-routing.module";
import {SharedModule} from "../../../shared/shared.module";
import {CardLeaderboardModule} from "../../card_/card-leaderbord/card-leaderboard.module";
import {CardEventRankingModule} from "../../card_/card-event-ranking/card-event-ranking.module";
import {AppModule} from "../../../app.module";
import {EventExerciseModule} from "../../card_/event-erxercise/event-exercise.module";



@NgModule({
  declarations: [
    PageEventComponent
  ],
  imports: [
    CommonModule,
    PageEventRoutingModule,
    SharedModule,
    CardLeaderboardModule,
    CardEventRankingModule,
    EventExerciseModule,
  ],
  exports: [
    PageEventComponent
  ],
})
export class PageEventModule { }
