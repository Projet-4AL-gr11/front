import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Leaderboard} from "../models/leaderboard.model";
import {EventRanking} from "../models/event_ranking.model";

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {

  constructor(private http: HttpClient) {
  }


  getLeaderboardWithExerciseId(id: string) {
    return this.http.get<Leaderboard[]>(`${environment.apiBaseUrl}/leaderboard/leaderboardExercise/${id}`);
  }

  getEventRanking(id: string) {
    return this.http.get<EventRanking[]>(`${environment.apiBaseUrl}/leaderboard/event/ranking/${id}`);;
  }
}
