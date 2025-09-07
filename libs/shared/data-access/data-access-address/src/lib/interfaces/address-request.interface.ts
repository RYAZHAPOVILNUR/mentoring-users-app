import { LanguageValues } from '@shared/util-language';

import { AddressType } from '../enums/address-type.enum';

export interface AddressRequest {
  query: string;
  type: AddressType;
  lang: LanguageValues;
}
