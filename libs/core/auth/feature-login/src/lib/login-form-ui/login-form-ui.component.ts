import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApiService } from '@users/core/http';
import { PushPipe } from '@ngrx/component';
import { InputPasswordComponent } from '@users/core/ui';
import { LanguageKeys, LanguageSwitchService } from '@users/users/core/ui/language-switch';
import { TranslateModule } from '@ngx-translate/core';

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
  @Output() login = new EventEmitter();
  @Output() redirectToSignup = new EventEmitter();
  private readonly languageSwitchService = inject(LanguageSwitchService);
  public readonly selectedLanguage$ = this.languageSwitchService.selectedLanguage$;

  public formGroup = new FormBuilder().group({
    email: new FormControl('admin@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('12345', [Validators.required]),
  });

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