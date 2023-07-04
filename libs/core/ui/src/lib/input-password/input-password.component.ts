import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Self, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ControlValueAccessor, FormBuilder, FormGroup, NgControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'input-password',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

// export class InputPasswordComponent implements OnInit {
//   private readonly ngControl = inject(NgControl)

//   public form!: FormGroup;
//   public isHide = true;
//   private readonly formBuilder = inject(FormBuilder)

//   ngOnInit(): void {
//     this.form = this.formBuilder.group({
//       password: ['', [Validators.required, Validators.minLength(5)]]
//     });
//   }

//   public get value(): string {
//     return this.ngControl.value;
//   }
// }

export class InputPasswordComponent implements ControlValueAccessor {
  public value: string | undefined;
  public isHide = true;

  private onChange!: (value: string) => void;
  private onTouched!: () => void;

    constructor(
        @Self() private readonly ngControl: NgControl,
        private readonly changeDetector: ChangeDetectorRef
    ) {
        this.ngControl.valueAccessor = this;
    }

  public onInputValueChange(event: Event): void {
    const targetInputElement = event.target as HTMLInputElement;
    const password = targetInputElement.value;

    this.onChange(password);
  }

  public writeValue(value: string): void {
    this.value = value;

    this.changeDetector.detectChanges();
  }

  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
