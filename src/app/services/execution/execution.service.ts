import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Leaderboard} from "../models/leaderboard.model";
import {EventRanking} from "../models/event_ranking.model";

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {

  constructor(private http: HttpClient) {
  }

  getLeaderboardWithExerciseId(id: string) {
    return this.http.get<Leaderboard[]>(`${environment.apiBaseUrl}/execution/leaderboardExercise/${id}`);
  }

  getEventRanking(id: string) {
    return this.http.get<EventRanking[]>(`${environment.apiBaseUrl}/execution/event/ranking/${id}`);

  }
}
