import { AddressType } from '@shared/data-access-address';

export const ADDRESS_FIELD_LABELS: Readonly<Record<AddressType, string>> = {
  [AddressType.COUNTRY]: 'ADDRESS.COUNTRY',
  [AddressType.REGION]: 'ADDRESS.REGION',
  [AddressType.AREA]: 'ADDRESS.AREA',
  [AddressType.CITY]: 'ADDRESS.CITY',
  [AddressType.SETTLEMENT]: 'ADDRESS.SETTLEMENT',
  [AddressType.STREET]: 'ADDRESS.STREET',
  [AddressType.HOUSE]: 'ADDRESS.HOUSE',
  [AddressType.FLAT]: 'ADDRESS.FLAT',
};
