import { FormControl } from '@angular/forms';

export type MaterialFormType<T> = {
  [K in keyof T]: FormControl<T[K] | null>;
}
