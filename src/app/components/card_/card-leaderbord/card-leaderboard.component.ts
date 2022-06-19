import {Component, Input, OnInit} from '@angular/core';
import {Leaderboard} from "../../../shared/models/leaderboard.model";

@Component({
  selector: 'app-card-leaderbord',
  templateUrl: './card-leaderboard.component.html',
  styleUrls: ['./card-leaderboard.component.css']
})
export class CardLeaderboardComponent implements OnInit {

  @Input('leaderboards') leaderboards: Leaderboard[];
  constructor() { }

  ngOnInit(): void {
  }

}
