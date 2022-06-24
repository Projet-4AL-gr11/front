import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Report} from "../models/report.model";
import {environment} from "../../../environments/environment";
import {Exercise} from "../models/exercise.model";
import {ExerciseTemplate} from "../models/erxercise_template.model";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) {
  }

  sendReport(id: string, report: Report) {
    return this.http.post<any>(`${environment.apiBaseUrl}/report/exercise`, report)
  }

  getEventExercise(id: string) {
    return this.http.get<Exercise[]>(`${environment.apiBaseUrl}/exercise/event/${id}`);
  }

  getExerciseTemplateWithExerciseId(id: string) {
    return this.http.get<ExerciseTemplate>(`${environment.apiBaseUrl}/exercise/exerciseTemplate/${id}`);
  }

  executeCode(exerciseId: string, value: any) {
    return this.http.put<any>(`${environment.apiBaseUrl}/exercise/execCode/${exerciseId}` , value)
  }

  getAllExerciseTemplate() {
    return this.http.get<ExerciseTemplate[]>(`${environment.apiBaseUrl}/exercise/exerciseTemplate`);
  }

  runCode(code: string) {
    return (
      {
        message: code
      })
    //  return this.http.post<any>(`${environment.apiBaseUrl}/exercise/exercise`, code)
  }

}
