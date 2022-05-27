import { Injectable } from '@angular/core';
import {Report} from "../../shared/models/report.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  sendReport(id: string, report: Report) {
    return this.http.put<any>(`${environment.apiBaseUrl}/report/user`, report)
  }
}
