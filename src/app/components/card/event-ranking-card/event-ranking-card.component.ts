import {Component, Input, OnInit} from '@angular/core';
import {EventRanking} from "../../../services/models/event_ranking.model";

@Component({
  selector: 'app-card-event-ranking',
  templateUrl: './event-ranking-card.component.html',
  styleUrls: ['./event-ranking-card.component.css']
})
export class EventRankingCardComponent implements OnInit {

  @Input('eventRankings') eventRankings: EventRanking[];
  constructor() { }

  ngOnInit(): void {
  }
}
