import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormType } from '@shared/util-typescript';
import { EditUserEntity } from '@users/users/data-access-user';

type UserDetailsForm = Required<Pick<EditUserEntity, 'name' | 'email' | 'username' | 'city'>>;

@Injectable({ providedIn: 'root' })
export class UserFormService {
  private readonly fb = inject<FormBuilder>(FormBuilder);

  getUserDetailsForm(): FormGroup<FormType<UserDetailsForm>> {
    return this.fb.group({
      name: this.fb.control('', { nonNullable: true, validators: [Validators.required] }),
      email: this.fb.control('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      username: this.fb.control<string | null>(null),
      city: this.fb.control<string | null>(null),
    });
  }
}
