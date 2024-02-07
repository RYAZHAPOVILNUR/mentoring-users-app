import {UsersEntity} from "../../core/data-access/src";

type StringKeys<T> = {
    [K in keyof T]: T[K] extends string ? K : never;
};

export type FilterField = NonNullable<StringKeys<UsersEntity>[keyof StringKeys<UsersEntity>]>

export interface UsersFilter{
    field: FilterField;
    value: string
}
