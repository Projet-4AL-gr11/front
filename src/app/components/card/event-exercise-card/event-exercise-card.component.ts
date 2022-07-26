import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {firstValueFrom} from "rxjs";
import {ExecutionService} from "../../../services/execution/execution.service";
import {ExerciseService} from "../../../services/exercise/exercise.service";
import * as ace from "ace-builds";
import {Leaderboard} from '../../../services/models/leaderboard.model';
import {ExerciseTemplate} from '../../../services/models/erxercise_template.model';
import {Exercise} from '../../../services/models/exercise.model';

@Component({
  selector: 'app-event-exercise',
  templateUrl: './event-exercise-card.component.html',
  styleUrls: ['./event-exercise-card.component.css']
})
export class EventExerciseCardComponent implements OnInit {

  @Input() description: String;

  constructor(
  ) {
  }

  ngOnInit(): void {
  }



}
