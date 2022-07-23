import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExecuteService {


  constructor(private http: HttpClient) {
  }


  runCode(code: string, selectLanguage: string) {

    const input = {
        execution_id: Date.now(),
        language: selectLanguage,
        code: code,
    };
    console.log(selectLanguage)
    const response = this.http.post<any>(`${environment.apiBaseUrl}/execution/sandbox`, input)

    return response.pipe(map(response => {
      console.log(response)
      return response.execution.result;
    }));
  }

}
