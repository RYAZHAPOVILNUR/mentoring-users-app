import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NewUser } from '@auth/data-access';

@Component({
  selector: 'users-register-form-ui',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  templateUrl: './register-form-ui.component.html',
  styleUrls: ['./register-form-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormUiComponent {

  public hide = true;
  public formGroup = new FormBuilder().group({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    agreement: new FormControl(false, Validators.requiredTrue)
  });

  @Output() redirectToLogin = new EventEmitter();
  @Output() register = new EventEmitter<NewUser>();

  onRegister() {
    if (this.formGroup.valid) {
      const userData = {
        name: this.formGroup.value.name?.trim() as string,
        email: this.formGroup.value.email?.trim().toLowerCase() as string,
        password: this.formGroup.value.password as string
      }
      console.log(userData)
      this.register.emit(userData);
    }
  }

  onRedirectToLogin() {
    this.redirectToLogin.emit();
  }
}
