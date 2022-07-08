import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Report} from "../models/report.model";
import {environment} from "../../../environments/environment";
import {Group} from "../models/group.model";
import {User} from "../models/user.model";
import {FormGroup} from "@angular/forms";
import {MediaService} from "../media/media.service";
import {GroupRequest} from "../models/GroupRequest.model";
import {GroupDto} from "../models/dto/custom/group.dto";
import {firstValueFrom} from "rxjs";
import {GroupRequestStatus} from "../../components/shared/enum/group-request-status.enum";
import {GroupMembership} from "../models/group_membership.model";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient, private mediaService: MediaService) { }

  sendReport(id: string, report: Report) {
    return this.http.post<any>(`${environment.apiBaseUrl}/report/group`, report)
  }

  findById(groupId: string) {
    return this.http.get<Group>(`${environment.apiBaseUrl}/group/${groupId}`)
  }

  findAll() {
    return this.http.get<Group>(`${environment.apiBaseUrl}/group`)
  }

  findGroupsWithUserId(userId: string) {
    return this.http.get<Group[]>(`${environment.apiBaseUrl}/group/userId/${userId}`)
  }

  getFollowers(groupId: string) {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/group/followers/${groupId}`)
  }

  getGroupsWhereUserIsAdmin(groupId: string) {
    return this.http.get<Group[]>(`${environment.apiBaseUrl}/group/whereAdmin/${groupId}`)
  }

  addGroupFollower(groupId: string) {
    return this.http.post(`${environment.apiBaseUrl}/group/addFollower/${groupId}`, null);
  }

  removeGroupFollower(groupId: string) {
    return this.http.put(`${environment.apiBaseUrl}/group/removeFollower/${groupId}`, null);
  }

  async createGroup(user: User, form: FormGroup, profilePicture?: File, bannerPicture?: File){
    const formData = new GroupDto();
    formData.user = user;
    formData.name = form.value.name;
    return firstValueFrom(this.http.post<Group>(`${environment.apiBaseUrl}/group/`, formData))
      .then(group => {
        if (form.value.profilePicture != null) {
          firstValueFrom(this.mediaService.saveGroupPicture(group.id, profilePicture )).then()
        }
        if (form.value.bannerPicture != null) {
          firstValueFrom(this.mediaService.saveGroupBannerPicture(group.id, bannerPicture )).then()
        }
      })
  }

  updateGroup(group: Group, form: FormGroup, picture: File) {
    const formData = new FormData();
    if (form.value.name != null){
      formData.append("name", form.value.name)
    }
    if (picture != null) {
      this.mediaService.saveGroupPicture(group.id, picture);
    }
    return this.http.put(`${environment.apiBaseUrl}/group/${group.id}`, formData);
  }

  removeGroup(groupId: string){
    return this.http.delete(`${environment.apiBaseUrl}/group/${groupId}`);
  }

  removeUser(groupId: string, userId: string) {
    return this.http.put(`${environment.apiBaseUrl}/group/removeUser/${groupId}/${userId}`, null);
  }

  isUserOwner(groupId: string, userId: string) {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/group/isUserOwner/${groupId}/${userId}`);
  }

  isUserAdmin(groupId: string, userId: string) {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/group/isUserAdmin/${groupId}/${userId}`);
  }

  giveAdminRight(groupId: string, userId: string) {
    return this.http.put(`${environment.apiBaseUrl}/group/giveAdminRight/${groupId}/${userId}`, null);
  }

  removeAdminRight(groupId: string, userId: string) {
    return this.http.put(`${environment.apiBaseUrl}/group/removeAdminRight/${groupId}/${userId}`, null);
  }

  giveGroupOwnership(groupId: string, userId: string) {
    return this.http.put(`${environment.apiBaseUrl}/group/giveGroupOwnership/${groupId}/${userId}`, null);
  }

  sendGroupRequest(groupId: string, userId: string) {
    return this.http.post(`${environment.apiBaseUrl}/group/sendGroupRequest/${groupId}`, null);
  }

  acceptGroupRequest(groupId: string, userId: string) {
    return this.http.post(`${environment.apiBaseUrl}/group/acceptGroupRequest/${groupId}/${userId}`, null);
  }

  cancelGroupRequest(groupId: string) {
    return this.http.post(`${environment.apiBaseUrl}/group/cancelGroupRequest/${groupId}`, null);
  }

  cancelGroupRequestAdmin(groupId: string, userId: string) {
    return this.http.put(`${environment.apiBaseUrl}/group/cancelGroupRequestAdmin/${groupId}/${userId}`, null);
  }

  getGroupRequest() {
    return this.http.get<GroupRequest[]>(`${environment.apiBaseUrl}/group/groupRequest/currentUser` );
  }

  getGroupRequestStatus(userId: string, groupId: string) {
    return this.http.get<GroupRequestStatus>(`${environment.apiBaseUrl}/group/groupRequest/status/${groupId}/${userId}` );
  }

  getGroupRequestWhereAdmin() {
    return this.http.get<GroupRequest[]>(`${environment.apiBaseUrl}/group/groupRequest/whereAdmin` );
  }

  getGroupMembers(id: string) {
    return this.http.get<GroupMembership[]>(`${environment.apiBaseUrl}/group/members/${id}` );
  }

  GetGroupRequestWithGroupId(id: string) {
    return this.http.get<GroupRequest[]>(`${environment.apiBaseUrl}/group/groupRequest/${id}` );
  }

  leaveGroup(id: string) {
    return this.http.put<GroupRequest[]>(`${environment.apiBaseUrl}/group/leaveGroup/${id}`, null );
  }
}
