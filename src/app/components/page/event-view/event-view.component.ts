import {Component, OnInit} from '@angular/core';
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
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../services/auth/auth.service";

@Component({
  selector: 'app-page-event',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

  event: Event;
  leaderboards: Leaderboard[] = [];
  result: string;
  timer = new Date();
  intervalId;
  currentExercise: Exercise;

  eventStarted: boolean = false;

  constructor(public _eventService: EventService,
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private _exerciseService: ExerciseService,
              private _titleService: Title,
              private _authService: AuthService,
              private _executionService: ExecutionService,
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

  public setTimer() {
    // Using Basic Interval
    this.intervalId = setInterval(() => {
      this.timer = new Date(new Date(this.event?.endDate).getTime() - Date.now())
    }, 1000);
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
      this.eventStarted = true;
      this._eventService.addParticipant(this.event.id, this._authService.getCurrentUserId()).subscribe({
        next: () => {
          this.startExercise(this.event.exercises[0])
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
  }

  nextExercise() {
    if ((this.event.exercises.length -1 == this.event.exercises.indexOf(this.currentExercise))) {
      this.eventStarted = false;
      this._snackBar.open('Event terminé, regarder où vous êtes dans le classement :)', 'Fermer', {
        duration: 3000
      });
      return;
    } else {
      this.currentExercise = this.event.exercises[this.event.exercises.indexOf(this.currentExercise) + 1];
    }
  }
}
