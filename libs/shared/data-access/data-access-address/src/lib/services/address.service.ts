import { inject, Injectable } from '@angular/core';
import { combineLatestWith, debounceTime, distinctUntilChanged, map, Observable, of, switchMap } from 'rxjs';

import { LanguageService } from '@shared/util-language';

import { AddressApiService } from './address-api.service';
import { AddressType } from '../enums/address-type.enum';
import { AddressRequest } from '../interfaces/address-request.interface';
import { Address } from '../interfaces/address.interface';

@Injectable({ providedIn: 'root' })
export class AddressService {
  private readonly languageService = inject(LanguageService);
  private readonly addressApiService = inject(AddressApiService);

  getAddressesByQuery(query: Observable<string>, type: AddressType): Observable<Address[]> {
    return query.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      combineLatestWith(this.languageService.selectedLanguage$),
      switchMap(([query, lang]) => (query ? this.getAddressList({ query, lang, type }) : of([]))),
    );
  }

  private getAddressList(request: AddressRequest): Observable<Address[]> {
    return this.addressApiService.getAddress(request).pipe(map(({ suggestions }) => suggestions));
  }
}
