import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EventRanking} from "../../../shared/models/event_ranking.model";

@Component({
  selector: 'app-card-event-ranking',
  templateUrl: './card-event-ranking.component.html',
  styleUrls: ['./card-event-ranking.component.css']
})
export class CardEventRankingComponent implements OnInit {

  @Input('eventRankings') eventRankings: EventRanking[];
  constructor() { }

  ngOnInit(): void {
  }
}
