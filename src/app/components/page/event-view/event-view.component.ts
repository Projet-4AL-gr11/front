import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../../services/event/event.service";
import {Title} from "@angular/platform-browser";
import {Event} from "../../../services/models/event.model";
import {firstValueFrom} from "rxjs";
import {ExerciseService} from "../../../services/exercise/exercise.service";
import {ExecutionService} from "../../../services/execution/execution.service";
import {Exercise} from "../../../services/models/exercise.model";
import {Leaderboard} from "../../../services/models/leaderboard.model";
import {Chronometer} from "ngx-chronometer";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../services/auth/auth.service";
import {EventIdeComponent} from "../../shared/event-ide/event-ide.component";
import {ExecuteDto} from "../../../services/models/dto/execute.dto";

@Component({
  selector: 'app-page-event',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

  event: Event;
  leaderboards: Leaderboard[] = [];
  timerState: boolean = false;
  currentExercise: Exercise;
  chronometer: Chronometer = new Chronometer();
  @ViewChild(EventIdeComponent) private eventIde: EventIdeComponent;

  constructor(public _eventService: EventService,
              private route: ActivatedRoute,
              private _exerciseService: ExerciseService,
              private _titleService: Title,
              private _executionService: ExecutionService,
              private _snackBar: MatSnackBar,
              private _authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.updateEvent(params["eventId"]).then(() =>
        this._titleService.setTitle(this.event.name + " - " + environment.name)
      );
    });
  }

  async updateEvent(id: string): Promise<void> {
    this.event = await firstValueFrom(this._eventService.getEventById(id));
    this.event.exercises = [];
    await firstValueFrom(this._exerciseService.getEventExercise(id)).then(exercises => this.event.exercises = exercises)
    await firstValueFrom(this._executionService.getEventRanking(id)).then(eventRanking => {
      this.event.eventRanking = eventRanking;
    })
  }

  startTimer() {
    this.timerState = false;
  }


  setExercise(exercise?: Exercise) {
    if (exercise != undefined) {
      this.currentExercise = exercise;
    }
  }

  startEvent() {
    console.log(this.event)
    if (!this.event?.exercises) {
      this._snackBar.open('Une erreur c\'est produite lors de la récupération des exercises, réessayer plus tard', 'Fermer', {
        duration: 3000
      });
      return;
    } else {
      this.timerState = true;
      this.chronometer.start();
      this._eventService.addParticipant(this.event.id, this._authService.getCurrentUserId()).subscribe({
        next: () => {
          this.startExercise(this.event.exercises[0])
          console.log("CURRENT EXO" + this.currentExercise.exerciseTemplate.language.name)
          console.log(this.currentExercise)
        },
        error: err => {
          if (!environment.production) {
            console.log(err)
          }
          this._snackBar.open('Il semble que vous avez déjà participer a l\'évènment', 'Fermer', {
            duration: 3000
          });
        }
      });
    }
  }

  startExercise(exercise: Exercise) {
    this.currentExercise = exercise;
    this.eventIde.changeLanguage(this.currentExercise.exerciseTemplate.language.name);

  }

  nextExercise() {
    if ((this.event.exercises.length -1 == this.event.exercises.indexOf(this.currentExercise))) {
      this.timerState = false;
      this._snackBar.open('Event terminé, regarder où vous êtes dans le classement :)', 'Fermer', {
        duration: 3000
      });
      return;
    } else {
      this.currentExercise = this.event.exercises[this.event.exercises.indexOf(this.currentExercise) + 1];
      this.eventIde.changeLanguage(this.currentExercise.exerciseTemplate.language.abbreviation);
      this.chronometer.restart()
    }
  }

  executeCode() {
    const exerciseRequest = new ExecuteDto(
      this.currentExercise.exerciseTemplate.language.abbreviation,
      this.eventIde.aceEditor.getValue(),
      this.currentExercise.id,
      this.chronometer.second,
    );
    this._exerciseService.executeEventCode(exerciseRequest).subscribe({
      next: result => {
        if (!result.isGoToNextExercise) {
          this.eventIde.setLog(result.log);
        } else {
          console.log(result);
          this.nextExercise();
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


/*
  ngOnChanges(changes: SimpleChanges): void {
    if (this.exercise) {
      firstValueFrom(this._exerciseService.getExerciseTemplateWithExerciseId(this.exercise.id)).then(exerciseTemplate => {
        this.exerciseTemplate = exerciseTemplate
      });
      firstValueFrom(this._executionService.getLeaderboardWithExerciseId(this.exercise.id)).then(leaderboards => {
        this.leaderboards = leaderboards;
      })
    }
  }

 */
