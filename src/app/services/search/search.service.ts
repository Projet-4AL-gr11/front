import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {environment} from "../../../environments/environment";
import {SearchResponseDto} from "../models/dto/custom/search-response.dto";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  search(userEntry: string): Observable<SearchResponseDto> {
    return this.http.get<SearchResponseDto>(`${environment.apiBaseUrl}/search/${userEntry}`);
  }
}
