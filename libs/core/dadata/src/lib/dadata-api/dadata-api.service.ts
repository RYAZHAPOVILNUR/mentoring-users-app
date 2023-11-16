import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {DadataResponse} from "@dadata";
import {DADATA_TOKEN} from "../dadata.token";

@Injectable({
  providedIn: 'root'
})
export class DadataApiService {
  http = inject(HttpClient)
  token = inject(DADATA_TOKEN)
  url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
  options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Token " + this.token
    }
  }

  public getCities<D extends string>(query: D): Observable<string[]> {
    return this.http.post<DadataResponse>(this.url, JSON.stringify({
      query, from_bound: {value: "city"},
      to_bound: {value: "city"}
    }), this.options).pipe(
      map(response => {
        const arr: string[] = []
        response.suggestions.forEach((item) => {
          arr.push(item.value)
        })
        return arr
      })
    )
  }
}
