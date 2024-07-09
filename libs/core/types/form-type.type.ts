import { FormControl, FormGroup } from '@angular/forms';

export type FormType<T> = {
  [P in keyof T]: T[P] extends 'object'
    ? FormGroup<FormType<T[P]>>
    : FormControl<T[P]>;
};