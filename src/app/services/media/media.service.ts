import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Media} from "../../shared/models/media.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) {
  }

  public getPostMedias(postId: string): Observable<Media[]> {
    return this.http.get<Media[]>(`${environment.apiBaseUrl}/media/post-picture/${postId}`);
  }

  public getCommentMedias(postId: string): Observable<Media[]> {
    return this.http.get<Media[]>(`${environment.apiBaseUrl}/media/comment-picture/${postId}`);
  }

  public getProfilePicture(userId: string): Observable<Media> {
    return this.http.get<Media>(`${environment.apiBaseUrl}/media/profile-picture/${userId}`);
  }

  public getBannerPicture(userId: string): Observable<Media> {
    return this.http.get<Media>(`${environment.apiBaseUrl}/media/banner-picture/${userId}`);
  }

  public getGroupPicture(userId: string): Observable<Media> {
    return this.http.get<Media>(`${environment.apiBaseUrl}/media/group-picture/${userId}`);
  }

  public getEventPicture(userId: string): Observable<Media> {
    return this.http.get<Media>(`${environment.apiBaseUrl}/media/event-picture/${userId}`);
  }

  public saveProfilePicture( file: File): Observable<any> {
    return this.http.post<Media>(`${environment.apiBaseUrl}/media/profile-picture/`, file);
  }

  public saveBannerPicture( file: File): Observable<any> {
    return this.http.post<Media>(`${environment.apiBaseUrl}/media/banner-picture/`, file);
  }

  public saveEventPicture(eventId: string, file: File): Observable<any> {
    return this.http.post<Media>(`${environment.apiBaseUrl}/media/event-picture/${eventId}`, file);
  }

  public saveGroupPicture(groupId: string, file: File): Observable<any> {
    return this.http.post<Media>(`${environment.apiBaseUrl}/media/group-picture/${groupId}`, file);
  }

  public savePostPicture(postId: string, file: File): Observable<any> {
    return this.http.post<Media>(`${environment.apiBaseUrl}/media/event-picture/${postId}`, file);
  }

  public saveCommentPicture(commentId: string, file: File): Observable<any> {
    return this.http.post<Media>(`${environment.apiBaseUrl}/media/comment-picture/${commentId}`, file);
  }
}
