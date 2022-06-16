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
    return this.http.get<Media[]>(`${environment.apiBaseUrl}/media/postPicture/${postId}`);
  }

  public getCommentMedias(postId: string): Observable<Media[]> {
    return this.http.get<Media[]>(`${environment.apiBaseUrl}/media/commentPicture/${postId}`);
  }

  public getProfilePicture(userId: string): Observable<Media> {
    return this.http.get<Media>(`${environment.apiBaseUrl}/media/profilePicture/${userId}`);
  }

  public getBannerPicture(userId: string): Observable<Media> {
    return this.http.get<Media>(`${environment.apiBaseUrl}/media/bannerPicture/${userId}`);
  }

  public getGroupPicture(userId: string): Observable<Media> {
    return this.http.get<Media>(`${environment.apiBaseUrl}/media/groupPicture/${userId}`);
  }

  public getEventPicture(userId: string): Observable<Media> {
    return this.http.get<Media>(`${environment.apiBaseUrl}/media/eventPicture/${userId}`);
  }

  public saveProfilePicture( file: File): Observable<any> {
    return this.http.post<Media>(`${environment.apiBaseUrl}/media/profilePicture/`, file);
  }

  public saveBannerPicture( file: File): Observable<any> {
    return this.http.post<Media>(`${environment.apiBaseUrl}/media/bannerPicture/`, file);
  }

  public saveEventPicture(eventId: string, file: File): Observable<any> {
    return this.http.post<Media>(`${environment.apiBaseUrl}/media/eventPicture/${eventId}`, file);
  }

  public saveGroupPicture(groupId: string, file: File): Observable<any> {
    return this.http.post<Media>(`${environment.apiBaseUrl}/media/groupPicture/${groupId}`, file);
  }

  public savePostPicture(postId: string, file: File): Observable<any> {
    return this.http.post<Media>(`${environment.apiBaseUrl}/media/eventPicture/${postId}`, file);
  }

  public saveCommentPicture(commentId: string, file: File): Observable<any> {
    return this.http.post<Media>(`${environment.apiBaseUrl}/media/commentPicture/${commentId}`, file);
  }
}
