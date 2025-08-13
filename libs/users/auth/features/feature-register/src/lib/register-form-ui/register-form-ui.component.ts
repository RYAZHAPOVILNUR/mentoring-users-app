import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PushPipe } from '@ngrx/component';
import { TranslateModule } from '@ngx-translate/core';

import { ApiService } from '@core/data-access-api';
import { PasswordFieldComponent } from '@shared/feature-password-field';
import { LanguageService, LanguageValues } from '@shared/util-language';
import { NewUser } from '@users/core/data-access-auth';

@Component({
  selector: 'users-register-form-ui',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    PasswordFieldComponent,
    TranslateModule,
    PushPipe,
  ],
  templateUrl: './register-form-ui.component.html',
  styleUrls: ['./register-form-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormUiComponent {
  private readonly api = inject(ApiService);
  private readonly languageSwitchService = inject(LanguageService);
  public hide = true;

  public formGroup = new FormBuilder().group({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    agreement: new FormControl(false, Validators.requiredTrue),
  });

  public readonly selectedLanguage$ = this.languageSwitchService.selectedLanguage$;

  @Output() redirectToLogin = new EventEmitter();
  @Output() register = new EventEmitter<NewUser>();

  onRegister() {
    if (this.formGroup.valid) {
      const userData = {
        name: this.formGroup.value.name?.trim() as string,
        email: this.formGroup.value.email?.trim().toLowerCase() as string,
        password: this.formGroup.value.password as string,
      };
      this.register.emit(userData);
    }
  }

  onRedirectToLogin() {
    this.redirectToLogin.emit();
  }

  public onSwitchLanguage(language: LanguageValues) {
    this.languageSwitchService.setLanguage(language);
  }
}
