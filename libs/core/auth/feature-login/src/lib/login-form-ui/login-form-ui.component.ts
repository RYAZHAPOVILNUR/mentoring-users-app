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
import { ApiService } from '@users/core/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs';

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
  private readonly api = inject(ApiService)

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

  // TODO: удалить, это просто для примера
  // test() {
  //   this.api.get('/auth/me', new HttpParams(), new HttpHeaders({
  //     'Authorization': 'Bearer eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiemlwIjoiREVGIn0.mY75YoeJpQyzzYOGVbIIdBPqN7YnWtfIien91BSWCPWPnOXNqFT_6PsaX5cuwn8g44b5JGZcFFV-tfddI6JJbod2Qx3O9SOa.dFia7xlc21AZSenTIowigQ.szl7wQTFGxv8Q4eILYJSd30MXTI319LBdEPLEeJYTgN0fYwRNFXI3avOE4e8-9juX94v-YJ0jW1ovo2Lj6GKjLqkp0EYQjmpo_OGsxdxJP5qEYwiW-YAqgTuTfryzb0etmt4-KqRRlEcQMXWNuJmrR8e328_FcBlT_6cv7TG9nM.5AUJNl4-oFqf8EGn0TK7yaDiBS7LKpESmj8JnamnWvw'
  //   })).pipe(tap(console.log)).subscribe()
  // }

}
