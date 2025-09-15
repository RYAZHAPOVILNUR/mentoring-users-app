export type NullableProperties<T> = {
  [K in keyof T]: T[K] | null;
};
