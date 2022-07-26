import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, timer} from "rxjs";
import {environment} from "../../../environments/environment";
import {User} from "../models/user.model";
import {HttpClient} from "@angular/common/http";
import {FriendRequest} from "../models/friend_request.model";
import {Event} from "../models/event.model";
import {Group} from "../models/group.model";
import {CookieService} from "ngx-cookie-service";
import {GroupRequest} from "../models/GroupRequest.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<User>;
  private userSubject: BehaviorSubject<User>;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.user = this.userSubject.asObservable();
    timer(0, 30000).subscribe(async () => await this.updateUser());
  }

  async updateUser() {
    if (!this.getCurrentUserId()) {
      await this.getCurrentUser();
    }
    if (this.getCurrentUserId() && this.userSubject) {
      await this.getParticipations();
      await this.getFriends();
      await this.getReceivedFriendshipRequest();
      await this.getReceivedGroupRequest();
      await this.getSentFriendshipRequest();
      await this.getGroup();
    }
  }

  getParticipations(): Observable<Event[]> {
    return this.http.get<Event[]>(`${environment.apiBaseUrl}/event/participation/${this.getCurrentUserId()}`)
      .pipe(map(participations => {
        let user = this.userSubject.getValue();
        if (user) {
          user.eventsParticipation = participations;
          this.userSubject.next(user);
        }
        return participations;
      }));
  }

  public getFriends(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/user/friendships/${this.getCurrentUserId()}`)
      .pipe(map(friends => {
        let user = this.userSubject.getValue();
        if (user) {
          user.friends = friends;
          this.userSubject.next(user);
        }
        return friends;
      }));
  }

  getReceivedFriendshipRequest(): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>(`${environment.apiBaseUrl}/friendship/received-friendship-request`)
      .pipe(map(requests => {
        let user = this.userSubject.getValue();
        user.friendRequests = requests;
        this.userSubject.next(user);
        return requests;
      }));
  }

  getReceivedGroupRequest(): Observable<GroupRequest[]> {
    return this.http.get<GroupRequest[]>(`${environment.apiBaseUrl}/group/groupRequest`)
      .pipe(map(requests => {
        let user = this.userSubject.getValue();
        user.groupRequests = requests;
        this.userSubject.next(user);
        return requests;
      }));
  }

  getSentFriendshipRequest(): Observable<FriendRequest[]> {
    return this.http.get<FriendRequest[]>(`${environment.apiBaseUrl}/friendship/sent-friendship-request`)
      .pipe(map(requests => {
        let user = this.userSubject.getValue();
        user.sentFriendRequests = requests;
        this.userSubject.next(user);
        return requests;
      }));
  }


  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiBaseUrl}/user/${this.getCurrentUserId()}`)
      .pipe(map(user => {
        this.userSubject.next(user);
        return user;
      }));
  }

  public register(email: string, username: string, password: string) {
    return this.http.post<User>(`${environment.apiBaseUrl}/auth/register`, {
      username,
      password,
      email
    })
      .pipe(map(user => {
        this.cookieService.set('user', user.id, {path: '/', sameSite: "None"});
        this.cookieService.set('username', user.username, {path: '/', sameSite: "None"});
        localStorage.setItem('Refresh', user.currentHashedRefreshToken,)
        this.updateUser();
        return user;
      }));
  }

  public login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.apiBaseUrl}/auth/login`, {
      username,
      password
    })
  }

  async logout() {
    this.userSubject.next(null);
    this.cookieService.delete('username', "/", environment.domain)
    this.cookieService.delete('user', "/", environment.domain)
    this.cookieService.delete('Refresh', "/", environment.domain)
    this.cookieService.delete('Authentication', "/", environment.domain)
    this.cookieService.deleteAll('/', environment.domain, false, "None")
    localStorage.clear()
    return this.http.post(`${environment.apiBaseUrl}/auth/logout`, null);
  }

  getGroup(): Observable<Group[]> {
    return this.http.get<Group[]>(`${environment.apiBaseUrl}/group/userId/${this.getCurrentUserId()}`)
      .pipe(map(groups => {
        let user = this.userSubject.getValue();
        user.groups = groups;
        this.userSubject.next(user);
        return groups;
      }));
  }

  public getCurrentUserId(): string {
    return this.cookieService.get('user');
  }

  public isAuthenticated(): boolean {
    const id = this.getCurrentUserId();
    return id !== null && id !== undefined && id !== "";
  }

  getToken() {
    return this.cookieService.get('refresh');
  }

  getCurrentUsername() {
    return this.cookieService.get('username');
  }

  actual() {
    return this.http.get<User>(`${environment.apiBaseUrl}/auth/actual`);
  }

  refreshCookieUsername(username) {
    this.cookieService.delete('username', '/');
    this.cookieService.set('username', username, {sameSite: "None", path: "/"});

  }
}
