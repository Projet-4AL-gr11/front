import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Report} from "../models/report.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  removeReport(reportId: string): Observable<any> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/report/${reportId}`);
  }

  getReportedComments(): Observable<Report[]> {
    return this.http.get<Report[]>(`${environment.apiBaseUrl}/report/comments`);
  }

  getRetortedEvent(): Observable<Report[]> {
    return this.http.get<Report[]>(`${environment.apiBaseUrl}/report/events`);
  }

  getReportedGroups(): Observable<Report[]> {
    return this.http.get<Report[]>(`${environment.apiBaseUrl}/report/groups`);
  }

  getReportedUsers(): Observable<Report[]> {
    return this.http.get<Report[]>(`${environment.apiBaseUrl}/report/users`);
  }

  getReportedExercise(): Observable<Report[]> {
    return this.http.get<Report[]>(`${environment.apiBaseUrl}/report/exercises`);
  }

  getReportedPosts(): Observable<Report[]> {
    return this.http.get<Report[]>(`${environment.apiBaseUrl}/report/posts`);
  }

}
