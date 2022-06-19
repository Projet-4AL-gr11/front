import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Exercise} from "../../../shared/models/exercise.model";
import {firstValueFrom} from "rxjs";
import {LeaderboardService} from "../../../services/leaderboard/leaderboard.service";
import {Leaderboard} from "../../../shared/models/leaderboard.model";
import {ExerciseService} from "../../../services/exercise/exercise.service";
import {ExerciseTemplate} from "../../../shared/models/erxercise_template.model";

@Component({
  selector: 'app-event-exercise',
  templateUrl: './event-exercise.component.html',
  styleUrls: ['./event-exercise.component.css']
})
export class EventExerciseComponent implements OnInit, OnChanges {
  result: string;
  leaderboards: Leaderboard[] = [];
  exerciseTemplate: ExerciseTemplate;
  @Input('exercise') exercise: Exercise;

  constructor(
    private _leaderboardService: LeaderboardService,
    private _exerciseService: ExerciseService
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.exercise) {
      firstValueFrom(this._exerciseService.getExerciseTemplateWithExerciseId(this.exercise.id)).then(exerciseTemplate => {
        console.log(exerciseTemplate)
        this.exerciseTemplate = exerciseTemplate
      });
      firstValueFrom(this._leaderboardService.getLeaderboardWithExerciseId(this.exercise.id)).then(leaderboards => {
        this.leaderboards = leaderboards;
      })
      console.log(this.leaderboards)
    }
  }

}
