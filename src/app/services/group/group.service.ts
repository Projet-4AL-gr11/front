import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Report} from "../../shared/models/report.model";
import {environment} from "../../../environments/environment";
import {Group} from "../../shared/models/group.model";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  sendReport(id: string, report: Report) {
    return this.http.put<any>(`${environment.apiBaseUrl}/report/group`, report)
  }

  findById(groupId: string) {
    return this.http.get<Group>(`${environment.apiBaseUrl}/group/${groupId}`)
  }

  findAll(groupId: string) {
    return this.http.get<Group>(`${environment.apiBaseUrl}/group`)
  }

  findGroupsWithUserId(userId: string) {
    return this.http.get<Group[]>(`${environment.apiBaseUrl}/group/userId/${userId}`)
  }

  getFollowers(groupId: string) {
    return this.http.get<Group>(`${environment.apiBaseUrl}/group/followers/${groupId}`)
  }

  getGroupsWhereUserIsAdmin(groupId: string) {
    return this.http.get<Group>(`${environment.apiBaseUrl}/group/whereAdmin/${groupId}`)
  }

  addGroupFollower(groupId: string) {
    return this.http.post(`${environment.apiBaseUrl}/group/addFollower/${groupId}`, null);
  }

  removeGroupFollower(groupId: string) {
    return this.http.put(`${environment.apiBaseUrl}/group/removeFollower/${groupId}`, null);
  }

  createGroup(){
    // TODO: createGroup()
    return Error("not implemented");
  }

  updateGroup(){
    // TODO: updateGroup()
    return Error("not implemented");
  }

  removeGroup(groupId: string){
    return this.http.delete(`${environment.apiBaseUrl}/group/${groupId}`);
  }

  removeUser(groupId: string, userId: string) {
    return this.http.put(`${environment.apiBaseUrl}/group/removeUser/${groupId}`, userId);
  }

  isUserOwner(groupId: string, userId: string) {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/group/isUserOwner/${groupId}/${userId}`);
  }

  isUserAdmin(groupId: string, userId: string) {
    return this.http.get<boolean>(`${environment.apiBaseUrl}/group/isUserAdmin/${groupId}/${userId}`);
  }

  giveAdminRight(groupId: string, userId: string) {
    return this.http.put(`${environment.apiBaseUrl}/group/giveAdminRight/${groupId}`, userId);
  }

  removeAdminRight(groupId: string, userId: string) {
    return this.http.put(`${environment.apiBaseUrl}/group/removeAdminRight/${groupId}`, userId);
  }

  giveGroupOwnership(groupId: string, userId: string) {
    return this.http.put(`${environment.apiBaseUrl}/group/giveGroupOwnership/${groupId}`, userId);
  }
}
