import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PipesModules} from "../../../pipes/pipes.modules";
import {EventExerciseComponent} from "./event-exercise.component";
import {CardLeaderboardModule} from "../card-leaderbord/card-leaderboard.module";

@NgModule({
  declarations: [
    EventExerciseComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    PipesModules,
    CardLeaderboardModule,
  ],
  exports: [
    EventExerciseComponent,
  ]
})
export class EventExerciseModule { }
