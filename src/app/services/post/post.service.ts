import {Injectable} from '@angular/core';
import {User} from "../models/user.model";
import {Report} from "../models/report.model";
import {Post} from "../models/post.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {MediaService} from "../media/media.service";
import {PostDto} from "../models/dto/custom/post.dto";
import {Media} from "../models/media.model";
import {Group} from "../models/group.model";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  headers: any;

  constructor(private http: HttpClient, private mediaService: MediaService) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'multipart/form-data;boundary=' + Math.random());
    this.headers.append('Accept', 'application/json');
  }

  getPostById(postId: string): Observable<Post> {
    return this.http.get<Post>(`${environment.apiBaseUrl}/post/${postId}`);
  }

  getTimeline(limit: number, offset: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/post/getTimeline/${offset}/${limit}`);
  }

  getPostLikes(postId: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/post/like/${postId}`);
  }

  isPostLiked(postId: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/post/is-liked/${postId}`);
  }

  likePost(postId: string): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/post/like/${postId}`, null);
  }

  sendReport(id: string, report: Report): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/report/post`, report);
  }

  dislikePost(postId: string): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/post/dislike/${postId}`, null);
  }


  deletePost(postId: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiBaseUrl}/post/${postId}`);
  }

  sharedPost(postId: string): Observable<Post> {
    return this.http.get<Post>(`${environment.apiBaseUrl}/post/getSharedPost/${postId}`);
  }

  async createPost(text: string, sharesPostId: string, sharedEventId: string, files: File[], groupSelected: Group) {
    let formData: PostDto = new PostDto();
    formData.text = text;
    if (sharesPostId !== undefined && sharesPostId !== null) {
      formData.sharesPost = sharesPostId
    }
    if (sharedEventId !== undefined && sharedEventId !== null) {
      formData.sharedEvent = sharedEventId
    }
    if (groupSelected !== undefined) {
      formData.group = groupSelected;
    }
    firstValueFrom(this.http.post<Post>(`${environment.apiBaseUrl}/post`, formData, {
      headers: this.headers,
      params: new HttpParams()
    })).then(post => {
        files.forEach(file => {
          const formData = new FormData();
          formData.append("file", file)
          firstValueFrom(this.http.post(`${environment.apiBaseUrl}/media/postPicture/${post.id}`, formData)).then(
            (media: Media) => post.medias.push(media)
          )
        })
      }
    );
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/post`);
  }

  getUserTimeline(id: string, limit: number, offset: number) {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/post/getUserPost/${id}/${offset}/${limit}`);
  }

  getAllUserPost(id: string) {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/post/getAllUserPost/${id}`);
  }

  getPostWithGroupId(id: string, limit: number, offset: number) {
    return this.http.get<Post[]>(`${environment.apiBaseUrl}/post/group/${id}/${offset}/${limit}`);
  }
}
