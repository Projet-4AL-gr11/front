import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Language} from "../../shared/models/language.model";
import {environment} from "../../../environments/environment";
import {Leaderboard} from "../../shared/models/leaderboard.model";
import {EventRanking} from "../../shared/models/event_ranking.model";

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
