import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Report} from "../models/report.model";
import {environment} from "../../../environments/environment";
import {firstValueFrom, Observable} from "rxjs";
import {Comment} from "../models/comment.model";
import {Media} from "../models/media.model";


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  getComments(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.apiBaseUrl}/comment/getPostComments/${postId}`);
  }


  sendComment(postId: string, text: string, files: File[]) {
    return firstValueFrom(this.http.post<Comment>(`${environment.apiBaseUrl}/comment/${postId}`, {text})).then(
      comment => {
        if (files.length > 0) {
          files.forEach(
            file => {
              comment.medias = []
              const formData = new FormData();
              formData.append("file", file)
              return firstValueFrom(this.http.post(`${environment.apiBaseUrl}/media/comment-picture/${comment.id}`, formData)).then(
                (media: Media) => comment.medias.concat(media)
              )
            }
          )
        }
      }
    );

  }

  deleteComment(id: string) {
    return this.http.delete<void>(`${environment.apiBaseUrl}/comment/${id}`);
  }

  sendReport(id: string, report: Report) {
    return this.http.put<any>(`${environment.apiBaseUrl}/report/comment`, report)
  }
}
