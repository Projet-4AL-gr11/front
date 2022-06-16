import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Report} from "../../components/shared/models/report.model";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }


  sendComment(postId: string, text: string): Observable<Comment> {
    return this.http.post<Comment>(`${environment.apiBaseUrl}/comment/${postId}`, {text});
  }

  deleteComment(id: string) {
    return this.http.delete<void>(`${environment.apiBaseUrl}/comment/${id}`);
  }

  sendReport(id: string, report: Report) {
    return this.http.put<any>(`${environment.apiBaseUrl}/report/comment`, report)
  }
}
