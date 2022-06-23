import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {firstValueFrom} from "rxjs";
import {LeaderboardService} from "../../../services/leaderboard/leaderboard.service";
import {ExerciseService} from "../../../services/exercise/exercise.service";
import * as ace from "ace-builds";
import { Leaderboard } from '../../shared/models/leaderboard.model';
import { ExerciseTemplate } from '../../shared/models/erxercise_template.model';
import { Exercise } from '../../shared/models/exercise.model';

@Component({
  selector: 'app-event-exercise',
  templateUrl: './event-exercice-card.component.html',
  styleUrls: ['./event-exercice-card.component.css']
})
export class EventExerciceCardComponent implements OnInit, OnChanges, AfterViewInit {
  result: string;
  leaderboards: Leaderboard[] = [];
  exerciseTemplate: ExerciseTemplate;
  @Input('exercise') exercise: Exercise;
  aceEditor: any;

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

  @ViewChild("editor") private editor: ElementRef<HTMLElement>;

  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");
    ace.config.set(
      "basePath",
      "https://unpkg.com/ace-builds@1.4.12/src-noconflict"
    );
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.session.setValue("<h1>Ace Editor works great in Angular!</h1>");
    this.aceEditor.setTheme("ace/theme/twilight");
    this.aceEditor.session.setMode("ace/mode/html");
    this.aceEditor.on("change", () => {
      console.log(this.aceEditor.getValue());
    });
  }

  executeCode() {
    firstValueFrom(this._exerciseService.executeCode(this.exercise.id, this.aceEditor.getValue())).then(result => this.result = result)
  }
}
