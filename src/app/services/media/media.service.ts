import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Media} from "../models/media.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

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
    const formData: any = new FormData()
    formData.append("file", file)
    return this.http.post<Media>(`${environment.apiBaseUrl}/media/profilePicture`, formData);
  }

  public saveBannerPicture( file: File): Observable<any> {
    const formData: any = new FormData()
    formData.append("file", file)

    return this.http.post<Media>(`${environment.apiBaseUrl}/media/bannerPicture`, formData);
  }

  public saveEventPicture(eventId: string, file: File): Observable<any> {
    const formData: any = new FormData()
    formData.append("file", file)
    return this.http.post<Media>(`${environment.apiBaseUrl}/media/eventPicture/${eventId}`, formData);
  }

  public saveGroupPicture(groupId: string, file: File): Observable<any> {
    const formData: any = new FormData()
    formData.append("file", file)
    return this.http.post<Media>(`${environment.apiBaseUrl}/media/groupPicture/${groupId}`, formData);
  }

  public savePostPicture(postId: string, file: File): Observable<any> {
    const formData: any = new FormData()
    formData.append("file", file)
    return this.http.post<Media>(`${environment.apiBaseUrl}/media/postPicture/${postId}`, formData);
  }

  public saveCommentPicture(commentId: string, file: File): Observable<any> {
    const formData: any = new FormData()
    formData.append("file", file)
    return this.http.post<Media>(`${environment.apiBaseUrl}/media/commentPicture/${commentId}`, formData);
  }

  public getPictureRefresh(pictureId: string): Observable<Media> {
    return this.http.get<Media>(`${environment.apiBaseUrl}/media/getRefreshUrl/${pictureId}`);
  }

  saveGroupBannerPicture(id: string, file: File) {
    const formData: any = new FormData()
    formData.append("file", file)
    return this.http.post<Media>(`${environment.apiBaseUrl}/media/groupBannerPicture/${id}`, formData);  }
}
