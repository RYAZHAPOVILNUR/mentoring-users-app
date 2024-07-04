import { ChangeDetectionStrategy, Component, forwardRef, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { VALIDATION_ERRORS, validationErrorsFactory } from '@users/config';
import { TranslateService } from '@ngx-translate/core';
import { ValidationErrors } from '../../abstract/validation-errors.abstract';


// @Component({
//   selector: 'users-sasat',
//   standalone: true,
//   imports: [
//     ReactiveFormsModule
//   ],
//   template: `
//     <input [formControl]="control">
//     <span>{{ errorMessage }}</span>
//   `
// })
// class MyComponent extends ValidationErrorsAbstract {
//   // control = new FormControl('sasat');
//   // sosatChlen = () => 'hyi' as const;
// }

@Component({
  selector: 'users-input-field',
  standalone: true,
  imports: [
    MatInputModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    },
    {
      provide: VALIDATION_ERRORS,
      useFactory: validationErrorsFactory,
      deps: [TranslateService]
    }
  ]
})
export class InputFieldComponent extends ValidationErrors implements ControlValueAccessor {
  private _value = '';
  control?: AbstractControl;
  isDisabled = false;

  // private readonly service = inject(Methods);

  onChange!: (_: string) => void;
  onTouched!: () => void;

  // obj = {
  //   required: 'ОШИБКА, ПОШЁЛ НАХУЙ',
  //   minlength: 'minlength',
  //   pattern: ''
  // };

  // message() {
  //   return this.service.getErrorMessage(this.control!, this.obj);
  // }

  @Input() label = '';

  validate(control: AbstractControl): void {
    this.control = control;
  }

  set value(val: string) {
    this._value = val;
    this.onChange?.(this._value);
  }

  get value() {
    return this._value;
  }

  writeValue(val: string): void {
    this.value = val;
  }

  registerOnChange(fn: (_: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: never): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}




