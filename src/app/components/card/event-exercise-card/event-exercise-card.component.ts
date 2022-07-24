import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {firstValueFrom} from "rxjs";
import {ExecutionService} from "../../../services/execution/execution.service";
import {ExerciseService} from "../../../services/exercise/exercise.service";
import * as ace from "ace-builds";
import {Leaderboard} from '../../../services/models/leaderboard.model';
import {ExerciseTemplate} from '../../../services/models/erxercise_template.model';
import {Exercise} from '../../../services/models/exercise.model';
import {MatSnackBar} from "@angular/material/snack-bar";
import {environment} from "../../../../environments/environment";
import {ExecuteDto} from "../../../services/models/dto/execute.dto";
import {EventIdeComponent} from "../../shared/event-ide/event-ide.component";

@Component({
  selector: 'app-event-exercise',
  templateUrl: './event-exercise-card.component.html',
  styleUrls: ['./event-exercise-card.component.css']
})
export class EventExerciseCardComponent implements OnChanges, AfterViewInit {
  result: string;
  leaderboards: Leaderboard[] = [];
  exerciseTemplate: ExerciseTemplate;
  @Input() exercise: Exercise;
  aceEditor: any;
  @ViewChild(EventIdeComponent) private editor: EventIdeComponent;
  @Output("nextExercise") nextExercise: EventEmitter<any> = new EventEmitter<any>();

  intervalId;
  timer: Timer;

  constructor(
    private _snackBar: MatSnackBar,
    private _executionService: ExecutionService,
    private _exerciseService: ExerciseService
  ) {
  }

  public setTimer() {
    // Using Basic Interval
    this.timer = new Timer();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.exercise) {
      firstValueFrom(this._exerciseService.getExerciseTemplateWithExerciseId(this.exercise.id)).then(exerciseTemplate => {
        this.exerciseTemplate = exerciseTemplate
      });
      firstValueFrom(this._executionService.getLeaderboardWithExerciseId(this.exercise.id)).then(leaderboards => {
        this.leaderboards = leaderboards;
      })
      this.setTimer();
    }
  }


  ngAfterViewInit(): void {

    console.log(this.exerciseTemplate)

  }

  executeCode() {
    const exerciseRequest = new ExecuteDto(
      this.exercise.exerciseTemplate.language.abbreviation,
      this.aceEditor.getValue(),
      this.exercise.id,
      this.timer.counter,
  );
    this._exerciseService.executeEventCode(exerciseRequest).subscribe({
      next: result => {
        if (!result.isGoToNextExercise) {
          this.result = result.log;
        } else {
          this.nextExercise.emit();
        }
      },
      error: err => {
        if (!environment.production) {
          console.log(err)
        }
        this._snackBar.open('Une érreur à été rencontré lors de l\'envoie du code', 'Fermer', {
          duration: 3000
        });
        return;
      }
    })
  }
}

class Timer {
  constructor(public counter = 0) {

    let intervalId = setInterval(() => {
      this.counter = this.counter + 1;
    }, 1000)
  }
}
