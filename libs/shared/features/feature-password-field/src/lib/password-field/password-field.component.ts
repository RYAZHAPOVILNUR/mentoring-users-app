import { ChangeDetectionStrategy, Component, computed, forwardRef, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Callback } from '@shared/util-typescript';

type ControlValue = string | null;
type InputValue = Extract<ControlValue, string>;

@Component({
  selector: 'users-password-field',
  standalone: true,
  imports: [MatIconModule, MatInputModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordFieldComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordFieldComponent implements ControlValueAccessor {
  private onChange?: Callback<InputValue>;
  private onTouched?: Callback;

  readonly label = input('');
  readonly appearance = input<MatFormFieldAppearance>('fill');

  readonly value = signal<ControlValue>(null);
  readonly isDisabled = signal(true);

  readonly isLabelInside = computed(() => this.appearance() === 'fill');

  isHide = true;

  onValueInput(password: InputValue): void {
    this.onChange?.(password);
    this.value.set(password);
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  writeValue(value: ControlValue): void {
    this.value.set(value);
  }

  registerOnChange(fn: typeof this.onChange): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: typeof this.onTouched): void {
    this.onTouched = fn;
  }
}
