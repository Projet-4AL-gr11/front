import {Component, Input, OnInit} from '@angular/core';
import {Leaderboard} from "../../../services/models/leaderboard.model";

@Component({
  selector: 'app-card-leaderbord',
  templateUrl: './leaderboard-card.component.html',
  styleUrls: ['./leaderboard-card.component.css']
})
export class LeaderboardCardComponent implements OnInit {

  @Input() leaderboards: Leaderboard[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
