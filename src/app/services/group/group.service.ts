import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Report} from "../../shared/models/report.model";
import {environment} from "../../../environments/environment";
import {Group} from "../../shared/models/group.model";

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

  findGroupsWithUserId(userId: string) {
    return this.http.get<Group[]>(`${environment.apiBaseUrl}/group/userId/${userId}`)
  }

  getFollowers(groupId: string) {
    return this.http.get<Group>(`${environment.apiBaseUrl}/group/followers/${groupId}`)
  }

  getGroupsWhereUserIsAdmin(groupId: string) {
    return this.http.get<Group>(`${environment.apiBaseUrl}/group/followers/${groupId}`)
  }

  createGroup
}
