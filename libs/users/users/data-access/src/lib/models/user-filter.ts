import { UsersEntity } from '@users/core/data-access';

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
};

export interface UserFilter {
  value: string,
  field:  NonNullable<StringKeys<UsersEntity>[keyof StringKeys<UsersEntity>]>;
}
