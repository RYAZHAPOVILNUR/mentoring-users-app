import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { AddressResponse } from '../interfaces/address-response.interface';
import { ADDRESS_API_KEY } from '../tokens/address-api-key.token';

@Injectable({
  providedIn: 'root',
})
export class AddressApiService {
  http = inject(HttpClient);
  token = inject(ADDRESS_API_KEY);
  url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
  options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Token ' + this.token,
    },
  };

  public getCities<D extends string>(query: D): Observable<string[]> {
    return this.http
      .post<AddressResponse>(
        this.url,
        JSON.stringify({
          query,
          from_bound: { value: 'city' },
          to_bound: { value: 'city' },
        }),
        this.options,
      )
      .pipe(map(({ suggestions }) => suggestions.map(({ value }) => value)));
  }
}
