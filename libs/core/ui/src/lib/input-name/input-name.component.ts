import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ProfileFormVm } from '@users/users/profile/feature-profile';
 
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'input-name',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './input-name.component.html',
  styleUrls: ['./input-name.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNameComponent implements ControlValueAccessor, OnInit {
  public value: string | undefined;

  private onChange!: (value: string) => void;
  private onTouched!: () => void;

  @Input({ required: true }) vm!: ProfileFormVm;
  ngOnInit(): void {
      this.value = this.vm.user.name;
  }
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
