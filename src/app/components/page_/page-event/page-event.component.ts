import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {EventService} from "../../../services/event/event.service";
import {Title} from "@angular/platform-browser";
import {Event} from "../../../shared/models/event.model";
import {firstValueFrom, map, share, Subscription, timer} from "rxjs";
import {ExerciseService} from "../../../services/exercise/exercise.service";
import {Exercise} from "../../../shared/models/exercise.model";
import {LeaderboardService} from "../../../services/leaderboard/leaderboard.service";

@Component({
  selector: 'app-page-event',
  templateUrl: './page-event.component.html',
  styleUrls: ['./page-event.component.css']
})
export class PageEventComponent implements OnInit {

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
      console.log(eventRanking)
      this.event.eventRanking = eventRanking;
  })
    this.setExercise(this.event?.exercises[0]);
    console.log(this.event)
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
