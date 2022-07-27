import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Leaderboard} from "../../../services/models/leaderboard.model";

@Component({
  selector: 'app-card-leaderbord',
  templateUrl: './leaderboard-card.component.html',
  styleUrls: ['./leaderboard-card.component.css']
})
export class LeaderboardCardComponent implements OnInit, AfterViewInit {

  @Input() leaderboards: Leaderboard[];

  constructor() {
  }

  ngOnInit(): void {
  }

  public sortArray() {
    if (this.leaderboards) {
      return this.leaderboards.sort(function (x,y) {
        if (x.timerScore > y.timerScore) {
          return 1;
        }

        if (x.timerScore < y.timerScore) {
          return -1;
        }
        return 0;
      } )
    }
    return []
  }

  ngAfterViewInit(): void {
    this.sortArray();
  }
}
