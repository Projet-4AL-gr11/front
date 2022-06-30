import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FriendRequest} from "../models/friend_request.model";
import {environment} from "../../../environments/environment";
import {FriendRequestStatus} from "../../components/shared/enum/friendship_request_status.enum";

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  constructor(private http: HttpClient) { }

  sentFriendshipRequest(): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>(`${environment.apiBaseUrl}/friendship/sent-friendship-request`);
  }

  receivedFriendshipRequest(): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>(`${environment.apiBaseUrl}/friendship/received-friendship-request`)
  }

  statusFriendship(userId: string): Observable<FriendRequestStatus> {
    return this.http.get<FriendRequestStatus>(`${environment.apiBaseUrl}/friendship/${userId}/friendship-status`)
  }

  removeFriendship(userId: string): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/friendship/${userId}/remove`)
  }

  sendFriendRequest(userId: string) {
    return this.http.post(`${environment.apiBaseUrl}/friendship/sendFriendshipRequest/${userId}`, null)
  }

  cancelFriendRequest(userId: string) {
    return this.http.delete(`${environment.apiBaseUrl}/friendship/${userId}/cancel`)
  }

  rejectFriendRequest(userId: string) {
    return this.http.delete(`${environment.apiBaseUrl}/friendship/cancel/friendship/${userId}`)
  }

  acceptFriendship(userId: string) {
    return this.http.put(`${environment.apiBaseUrl}/friendship/acceptFriendshipRequest/${userId}`, null)
  }
}
