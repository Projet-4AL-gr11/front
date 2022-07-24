import {AfterViewInit, Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-page-event',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

  event: Event;
  leaderboards: Leaderboard[] = [];
  timerState: boolean = true;
  currentExercise: Exercise;
  chronometer: Chronometer = new Chronometer();

  constructor(public _eventService: EventService,
              private route: ActivatedRoute,
              private _exerciseService: ExerciseService,
              private _titleService: Title,
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
    await firstValueFrom(this._exerciseService.getEventExercise(id)).then(exercises => this.event.exercises = exercises)
    await firstValueFrom(this._executionService.getEventRanking(id)).then(eventRanking => {
      this.event.eventRanking = eventRanking;
    })
    this.setExercise(this.event?.exercises[0]);
  }

  setExercise(exercise?: Exercise) {
    if (exercise != undefined) {
      this.currentExercise = exercise;
    }
  }

  startTimer() {
    this.chronometer.start();
    this.timerState = false;
  }

}
