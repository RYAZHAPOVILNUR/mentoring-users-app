import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AddressRequest } from '../interfaces/address-request.interface';
import { AddressResponse } from '../interfaces/address-response.interface';
import { ADDRESS_API_KEY } from '../tokens/address-api-key.token';
import { ADDRESS_API_URL } from '../tokens/address-api-url.token';

type HttpPostOptions = Parameters<HttpClient['post']>[2];

@Injectable({ providedIn: 'root' })
export class AddressApiService {
  private readonly http = inject(HttpClient);
  private readonly url = inject(ADDRESS_API_URL);
  private readonly token = inject(ADDRESS_API_KEY);

  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Token ' + this.token,
  });

  private readonly options: HttpPostOptions = { headers: this.headers };

  getAddress({ query, type, lang = 'ru' }: AddressRequest): Observable<AddressResponse> {
    const body = JSON.stringify({
      query,
      from_bound: { value: type },
      to_bound: { value: type },
      language: lang,
    });

    return this.http.post<AddressResponse>(this.url, body, this.options);
  }
}
