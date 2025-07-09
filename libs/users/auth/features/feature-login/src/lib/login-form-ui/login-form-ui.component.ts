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
import { InputPasswordComponent } from '@users/core/ui';

import { ApiService } from '@core/data-access-api';
import { LanguageKeys, LanguageService } from '@shared/util-language';

@Component({
  selector: 'users-login-form-ui',
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
    InputPasswordComponent,
    TranslateModule,
    PushPipe,
  ],
  templateUrl: './login-form-ui.component.html',
  styleUrls: ['./login-form-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormUiComponent {
  private readonly api = inject(ApiService);
  private readonly languageSwitchService = inject(LanguageService);
  public readonly selectedLanguage$ = this.languageSwitchService.selectedLanguage$;
  public formGroup = new FormBuilder().group({
    email: new FormControl('admin@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('12345', [Validators.required]),
  });
  @Output() login = new EventEmitter();

  @Output() redirectToSignup = new EventEmitter();

  onRedirectToSignUp() {
    this.redirectToSignup.emit();
  }

  onLogin() {
    if (this.formGroup.valid) {
      const userData = {
        email: this.formGroup.value.email?.trim().toLowerCase(),
        password: this.formGroup.value.password,
      };
      this.login.emit(userData);
    }
  }

  public onSwitchLanguage(language: LanguageKeys) {
    this.languageSwitchService.setLanguage(language);
  }
}
