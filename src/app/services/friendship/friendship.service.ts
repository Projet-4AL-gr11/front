import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {FriendRequest} from "../../shared/models/friend_request.model";
import {environment} from "../../../environments/environment";
import {FriendRequestStatus} from "../../shared/enum/friendship_request_status.enum";

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
}
