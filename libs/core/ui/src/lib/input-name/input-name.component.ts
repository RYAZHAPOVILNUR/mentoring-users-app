import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
 
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'input-name',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input-name.component.html',
  styleUrls: ['./input-name.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNameComponent implements ControlValueAccessor {
  public value: string | undefined;

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
    const name = targetInputElement.value;

    this.onChange(name);
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
