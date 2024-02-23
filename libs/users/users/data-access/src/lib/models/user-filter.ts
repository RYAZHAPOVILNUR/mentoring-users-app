import { UsersEntity } from '@users/core/data-access';

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
};

export type FilterField = NonNullable<StringKeys<UsersEntity>[keyof StringKeys<UsersEntity>]>;

export interface UserFilter {
  value: string,
  field: FilterField
}

export type FiltersArray = UserFilter [];
