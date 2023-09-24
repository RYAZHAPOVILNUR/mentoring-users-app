import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Self, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NgControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ProfileFormVm } from '@users/users/profile/feature-profile';

@Component({
  selector: 'users-input-email',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputEmailComponent implements ControlValueAccessor, OnInit{
  public  value: string | undefined;
  private onChange!: (value: string) => void;
  private onTouched!: () => void;

  @Input({ required: true }) vm!: ProfileFormVm;

  ngOnInit(): void {
      this.value = this.vm.user.email;
  }
  
  constructor(
    @Self() private readonly ngControl: NgControl,
    private readonly changeDetector: ChangeDetectorRef
    )
  {
      this.ngControl.valueAccessor = this;
  }
  
  public onInputValueChange(event: Event): void {
    const targetInputElement = event.target as HTMLInputElement;
    const email = targetInputElement.value;

    this.onChange(email);
  }

  registerOnChange(fn: any): void {
      this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
      this.onTouched = fn;
  }

  // ASK - ЧЕ ОН ДЕЛАЕТ?
  writeValue(value: string): void {
      this.value = value;
      this.changeDetector.detectChanges();
  }
  
}
