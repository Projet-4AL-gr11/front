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
import {ExecCodeEnum} from "../../../services/models/enum/execCode.enum";

@Component({
  selector: 'app-page-event',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

  loadingExec: boolean = false;
  indexExo = 0;
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
    await this._eventService.isMember(id).subscribe({
      next: value => {
        this.event.isMember = value;
        console.log( value)
      },
      error: err => {
        if (environment.production) {
          console.log(err)
        }
      }
    })
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
    if (!this.event?.exercises) {
      this._snackBar.open('Une erreur c\'est produite lors de la r??cup??ration des exercises, r??essayer plus tard', 'Fermer', {
        duration: 3000
      });
      return;
    } else {

      this._eventService.addParticipant(this.event.id, this._authService.getCurrentUserId()).subscribe({
        next: () => {
          this.timerState = true;
          this.event.isMember = true;
          this.chronometer.start();
          this.startExercise(this.event.exercises[0])
        },
        error: err => {
          if (!environment.production) {
            console.log(err)
          }
          this._snackBar.open('Il semble que vous avez d??j?? participer a l\'??v??nment', 'Fermer', {
            duration: 3000
          });
        }
      });
    }
  }

  startExercise(exercise: Exercise) {
    setTimeout(() => {
      this.currentExercise = exercise;
      this.eventIde.changeLanguage(this.currentExercise.exerciseTemplate.language.name);
    }, 1000)
    // this.currentExercise = exercise;
    // this.eventIde.changeLanguage(this.currentExercise.exerciseTemplate.language.name);
  }

  nextExercise() {
    if ((this.event.exercises.length -1 == this.event.exercises.indexOf(this.currentExercise))) {
      this.timerState = false;
      this._snackBar.open('Event termin??, regarder o?? vous ??tes dans le classement :)', 'Fermer', {
        duration: 3000
      });
      this.updateEvent(this.event.id).then();
      return;
    } else {
      this.eventIde.clearIde();
      this.currentExercise = this.event.exercises[this.event.exercises.indexOf(this.currentExercise) + 1];
      this.eventIde.changeLanguage(this.currentExercise.exerciseTemplate.language.name);
      this.chronometer.restart()
    }
  }

  executeCode() {
    this.loadingExec = true;
    if (this.eventIde.aceEditor.getValue().includes(ExecCodeEnum.EXEC_PATTERN)) {
      this.loadingExec = false;
      this._snackBar.open('Vous ne pouvez pas envoy?? du code avec le patern : \'' + ExecCodeEnum.EXEC_PATTERN + '\'' , 'Fermer', {
        duration: 3000
      });
      this.updateEvent(this.event.id).then();
      return;
    }
    const exerciseRequest = new ExecuteDto(
      this.setLanguage(this.currentExercise.exerciseTemplate.language.name),
      this.eventIde.aceEditor.getValue(),
      this.currentExercise.id,
      this.chronometer.second,
    );
    this._exerciseService.executeEventCode(exerciseRequest).subscribe({
      next: result => {
        if (!result.isGoToNextExercise) {
          this.loadingExec = false;

          this.eventIde.setLog(result.log);
        } else {
          this.loadingExec = false;
          this.nextExercise();
        }
      },
      error: err => {
        if (!environment.production) {
          console.log(err)
        }
        this._snackBar.open('Une ??rreur ?? ??t?? rencontr?? lors de l\'envoie du code', 'Fermer', {
          duration: 3000
        });
        this.loadingExec = false;
        return;
      }
    })
  }

  setLanguage(language: string): string {
    if(language == "Python") return "py";
    if(language == "JS") return "js";
    return "";
  }

}

