import { Injectable } from '@angular/core';
import {User} from "../../components/shared/models/user.model";
import {Report} from "../../components/shared/models/report.model";
import {Post} from "../../components/shared/models/post.model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }
  getPostById(postId: string): Observable<Post> {
    return this.http.get<Post>(`${environment.apiBaseUrl}/post/${postId}`);
  }

  getTimeline( limit: number, offset: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/post/getTimeline/${offset}/${limit}`);
  }

  getPostLikes(postId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/post/like/${postId}`);
  }

  isPostLiked(postId: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/post/is-liked${postId}`);
  }

  likePost(postId: string): Observable<void> {
    return this.http.get<void>(`${environment.apiBaseUrl}/post/${postId}/like`);
  }

  sendReport(id: string, report: Report): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/report/post`, report);
  }

  dislikePost(postId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/post/${postId}/like`);
  }

  getComments(postId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.apiBaseUrl}/post/${postId}/comments`);
  }

  sendComment(postId: string, text: string): Observable<Comment> {
    return this.http.post<Comment>(`${environment.apiBaseUrl}/post/${postId}/comment`, {text});
  }

  deletePost(postId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/post/${postId}`);
  }

  sharedPost(postId: string): Observable<Post> {
    return this.http.get<Post>(`${environment.apiBaseUrl}/post/${postId}/shares`);
  }

  createPost(text: string, sharesPostId: string, sharedEventId: string, files: File[]) {
    const formData = new FormData();
    if (text === undefined) {
      text = "";
    }
    formData.append("text", text);
    if (sharesPostId !== undefined && sharesPostId !== null) {
      formData.append("sharesPost", sharesPostId);
    }
    if (sharedEventId !== undefined && sharedEventId !== null) {
      formData.append("sharedEvent", sharedEventId);
    }
    if (files) {
      for (let file of files) {
        formData.append("post_medias", file);
      }
    }
    return this.http.post<Post>(`${environment.apiBaseUrl}/post`, formData);
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/post`);
  }

  getUserTimeline(id: string, limit: number, offset: number) {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/post/getTimeline/${offset}/${limit}`);
  }
}
