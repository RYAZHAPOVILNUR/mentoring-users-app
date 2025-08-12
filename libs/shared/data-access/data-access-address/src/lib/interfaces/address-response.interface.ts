import { Address } from './address.interface';

/**
 * @see [API](https://dadata.ru/api/suggest/address/)
 */
export interface AddressResponse {
  suggestions: Address[];
}
