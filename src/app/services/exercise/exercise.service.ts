import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Report} from "../models/report.model";
import {environment} from "../../../environments/environment";
import {Exercise} from "../models/exercise.model";
import {ExerciseTemplate} from "../models/erxercise_template.model";
import {FormGroup} from "@angular/forms";
import {ExerciseTemplateDto} from "../models/dto/exercise_template.dto";
import {Language} from "../models/language.model";
import {Observable} from "rxjs";
import {ExecuteResponseDto} from "../models/dto/execute_response.dto";
import {ExecuteDto} from "../models/dto/execute.dto";

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

  executeCode(exerciseId: string, value: any): Observable<ExecuteResponseDto>{
    return this.http.put<ExecuteResponseDto>(`${environment.apiBaseUrl}/exercise/execCode/${exerciseId}`, value)
  }

  executeEventCode(executeDto: ExecuteDto): Observable<ExecuteResponseDto>{
    return this.http.post<ExecuteResponseDto>(`${environment.apiBaseUrl}/execution/execute`, executeDto)
  }

  getAllExerciseTemplate() {
    return this.http.get<ExerciseTemplate[]>(`${environment.apiBaseUrl}/exercise/exerciseTemplate/all`);
  }


  createExerciseTemplate(newExerciseTemplate: FormGroup, language: Language) {
    const formData = new ExerciseTemplateDto();
    formData.name = newExerciseTemplate.value.name;
    formData.description = newExerciseTemplate.value.description;
    formData.language = language.id;
    formData.code = newExerciseTemplate.value.code;
    return this.http.post<any>(`${environment.apiBaseUrl}/exercise/exerciseTemplate`, formData);
  }

  updateExerciseTemplate(exerciseTemplateId: string, updatedExerciseTemplate: FormGroup) {
    const formData = new ExerciseTemplateDto();
    formData.id = exerciseTemplateId;
    formData.name = updatedExerciseTemplate.value.name;
    formData.description = updatedExerciseTemplate.value.description;
    formData.language = updatedExerciseTemplate.value.language.id;
    formData.code = updatedExerciseTemplate.value.code;
    return this.http.put<ExerciseTemplate>(`${environment.apiBaseUrl}/exercise/exerciseTemplate`, formData);
  }

  getExerciseTemplateWithId(id: string) {
    return this.http.get<ExerciseTemplate>(`${environment.apiBaseUrl}/exercise/exerciseTemplate/${id}`);
  }

  removeExerciseTemplate(id: string) {
    return this.http.delete<ExerciseTemplate>(`${environment.apiBaseUrl}/exercise/exerciseTemplate/${id}`);
  }
}
