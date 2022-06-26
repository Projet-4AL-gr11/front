import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../../services/event/event.service";
import {Title} from "@angular/platform-browser";
import {Event} from "../../../services/models/event.model";
import {firstValueFrom} from "rxjs";
import {ExerciseService} from "../../../services/exercise/exercise.service";
import {LeaderboardService} from "../../../services/leaderboard/leaderboard.service";
import {Exercise} from "../../../services/models/exercise.model";

@Component({
  selector: 'app-page-event',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventViewComponent implements OnInit {

  event: Event;
  result: string;
  timer = new Date();
  intervalId;
  currentExercise: Exercise;

  constructor(public _eventService: EventService,
              private route: ActivatedRoute,
              private _exerciseService: ExerciseService,
              private _titleService: Title,
              private _leaderboardService: LeaderboardService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.updateEvent(params["eventId"]).then(() =>
        this._titleService.setTitle(this.event.name + " - " + environment.name)
      );
    });
    this.setTimer();
  }


  async updateEvent(id: string): Promise<void> {
    this.event = await firstValueFrom(this._eventService.getEventById(id));
    this.event.exercises = [];
    await firstValueFrom(this._exerciseService.getEventExercise(id)).then(exercises => this.event.exercises = exercises)
    await firstValueFrom(this._leaderboardService.getEventRanking(id)).then(eventRanking =>{
      this.event.eventRanking = eventRanking;
  })
    this.setExercise(this.event?.exercises[0]);
  }

  public setTimer() {
    // Using Basic Interval
    this.intervalId = setInterval(() => {
      this.timer = new Date(new Date(this.event?.endDate).getTime() - Date.now())
    }, 1000);


  }

  setExercise(exercise?: Exercise) {
    if (exercise != undefined){
      this.currentExercise = exercise;
    }
  }
}
