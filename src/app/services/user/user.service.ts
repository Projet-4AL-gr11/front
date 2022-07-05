import { Injectable } from '@angular/core';
import {Report} from "../models/report.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {User} from "../models/user.model";
import {FormGroup} from "@angular/forms";
import {firstValueFrom, Observable} from "rxjs";
import {MediaService} from "../media/media.service";
import {UserDto} from "../models/dto/custom/user.dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private mediaService: MediaService) { }

  sendReport(id: string, report: Report) {
    return this.http.post<any>(`${environment.apiBaseUrl}/report/user`, report)
  }

  getById(id: string) {
    return this.http.get<User>(`${environment.apiBaseUrl}/user/${id}`);
  }

  getFriends(id: string) {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/user/friendships/${id}`);
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

  async putUser(user: FormGroup, updatedProfilePicture: File, updatedBannerPicture: File): Promise<User> {
    const formData = new UserDto();
    if (user.value.username !== null) {
      formData.username = user.value.username;
    }
    if (user.value.email) {
      formData.email = user.value.email;
    }
    if (user.value.bio) {
      formData.bio = user.value.bio;
    }
    if (updatedProfilePicture !== null) {
      firstValueFrom(this.mediaService.saveProfilePicture(updatedProfilePicture)).then();
    }
    if (updatedBannerPicture !== null) {
      firstValueFrom(await this.mediaService.saveBannerPicture(updatedBannerPicture)).then();
    }
    return firstValueFrom(this.http.put<User>(`${environment.apiBaseUrl}/user/`, formData));
  }

  removeUser(id: string) {
    return this.http.delete<void>(`${environment.apiBaseUrl}/user/${id}`);
  }

  researchUsername(username: string) {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/user/researchUsername/${username}`);
  }
}
