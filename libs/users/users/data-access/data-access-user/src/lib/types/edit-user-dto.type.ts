import { NullableProperties } from '@shared/util-typescript';
import { UserDTO } from '@users/shared/data-access-models';

type RequiredKeys = Pick<UserDTO, 'id' | 'purchaseDate' | 'educationStatus'>;
type OptionalKeys = Partial<Pick<UserDTO, 'name' | 'email' | 'totalStoryPoints'>>;
type OptionalNullableKeys = NullableProperties<Partial<Pick<UserDTO, 'city' | 'role' | 'photo' | 'username'>>>;

export type EditUserDTO = RequiredKeys & OptionalKeys & OptionalNullableKeys;
