import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Report} from "../../shared/models/report.model";
import {environment} from "../../../environments/environment";
import {Exercise} from "../../shared/models/exercise.model";
import {EventRanking} from "../../shared/models/event_ranking.model";
import {ExerciseTemplate} from "../../shared/models/erxercise_template.model";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) { }

  sendReport(id: string, report: Report) {
    return this.http.post<any>(`${environment.apiBaseUrl}/report/exercise`, report)
  }

  getEventExercise(id: string) {
    return this.http.get<Exercise[]>(`${environment.apiBaseUrl}/exercise/event/${id}`);
  }

  getExerciseTemplateWithExerciseId(id: string) {
    return this.http.get<ExerciseTemplate>(`${environment.apiBaseUrl}/exercise/exerciseTemplate/${id}`);
  }
}
