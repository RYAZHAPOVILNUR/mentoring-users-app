import { FormControl, FormGroup } from '@angular/forms';

export type FormType<T> = {
  [K in keyof T]: T[K] extends object ? FormGroup<FormType<T[K]>> : FormControl<T[K]>;
};
