import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Report} from "../../components/shared/models/report.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) {
  }

  sendReport(id: string, report: Report) {
    return this.http.put<any>(`${environment.apiBaseUrl}/report/exercise`, report)
  }

  runCode(code: string) {
    return (
      {
        message: code
      })
    //  return this.http.post<any>(`${environment.apiBaseUrl}/exercise/exercise`, code)
  }

}
