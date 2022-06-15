import { Injectable } from '@angular/core';
import {Report} from "../../shared/models/report.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../../shared/models/user.model";
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {MediaService} from "../media/media.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private mediaService: MediaService) { }

  sendReport(id: string, report: Report) {
    return this.http.put<any>(`${environment.apiBaseUrl}/report/user`, report)
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.apiBaseUrl}/user/${id}`);
  }

  getFriends(id: string) {
    return this.http.get<User>(`${environment.apiBaseUrl}/user/friendship/${id}`);
  }

  isBlocked(id: string) {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/user/isBlocked/${id}`)
  }

  hasBlocked(id: string) {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/user/hasBlocked/${id}`)
  }

  blockUser(id: string) {
    return this.http.post<void>(`${environment.apiBaseUrl}/user/block/${id}`, null);
  }

  unblockUser(id: string) {
    return this.http.post<void>(`${environment.apiBaseUrl}/user/unblock/${id}`, null);
  }

  putUser(user: FormGroup, updatedProfilePicture: File, updatedBannerPicture: File): Observable<User> {
    const formData = new FormData();
    if (user.value.mail !== null){
      formData.append("mail", user.value.mail);
    }
    if (user.value.firstname !== null){
      formData.append("username", user.value.firstname);
    }
    if (user.value.bio){
      formData.append("bio", user.value.bio);
    }
    if (updatedProfilePicture !== null) {
      this.mediaService.saveProfilePicture(updatedProfilePicture);
    }
    if (updatedBannerPicture !== null) {
      this.mediaService.saveBannerPicture(updatedBannerPicture);
    }
    return this.http.put<User>(`${environment.apiBaseUrl}/user/`, formData);
  }

  removeUser(id: string) {
    return this.http.delete<void>(`${environment.apiBaseUrl}/user/${id}`);
  }
}
