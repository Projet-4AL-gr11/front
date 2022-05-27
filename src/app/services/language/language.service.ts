import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Language} from "../../shared/models/language.model";
import {environment} from "../../../environments/environment";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) {
  }

  getAllLanguage(): Observable<Language[]> {
    return this.http.get<Language[]>(`${environment.apiBaseUrl}/language/`);
  }

  getById(languageId: string): Observable<Language[]> {
    return this.http.get<Language[]>(`${environment.apiBaseUrl}/language/${languageId}`)
  }

  delete(languageId: string): Observable<any> {
    return this.http.delete(`${environment.apiBaseUrl}/language/${languageId}`)
  }

  update(languageId: string, updatedLanguage: FormGroup) {
    let formData = new FormData();
    formData.append("name", updatedLanguage.value.name);

    return this.http.put(`${environment.apiBaseUrl}/language/${languageId}`, formData)
  }

  create(languageId: string, newLanguage: FormGroup) {
    let formData = new FormData();
    formData.append("name", newLanguage.value.name);

    return this.http.post(`${environment.apiBaseUrl}/language/${languageId}`, formData)

  }
}
