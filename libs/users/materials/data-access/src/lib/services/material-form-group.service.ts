import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export type FormType<T> = {
  [P in keyof T]: T[P] extends 'object'
    ? FormGroup<FormType<T[P]>>
    : FormControl<T[P]>;
};

export type MaterialForm = {
  title: string,
  materialLink: string
}

@Injectable()
export class MaterialFormGroupService {
  private readonly fb = inject(FormBuilder);

  getMaterialFormGroup(): FormGroup<FormType<MaterialForm>> {
    return this.fb.nonNullable.group({
      title: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      materialLink: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*http).*\.(mp3|pdf)$|^(?=.*http).*(youtube|youtu\.be)/)
      ]]
    });
  }
}