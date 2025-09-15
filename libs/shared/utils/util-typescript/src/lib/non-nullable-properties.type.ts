export type NonNullableProperties<T> = {
  [K in keyof T]: NonNullable<T[K]>;
};
