import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'users-login-form-ui',
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
  templateUrl: './login-form-ui.component.html',
  styleUrls: ['./login-form-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormUiComponent {
  private readonly router = inject(Router);
  @Output() login = new EventEmitter();

  public formGroup = new FormBuilder().group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  redirToSignUp() {
    this.router.navigate(['/auth/sign-up'])
  }

  onLogin() {
    this.login.emit(this.formGroup.value);
  }

}
