import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersFacade } from '../../../../data-access/src/lib/+state/users.facade';

@Component({
  selector: 'users-create-users-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './create-users-dialog.component.html',
  styleUrls: ['./create-users-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUsersDialogComponent {
  private readonly usersFacade = inject(UsersFacade);
  private readonly formBuilder = inject(FormBuilder);

  public form: FormGroup = this.formBuilder.group({
    name: ['', [ Validators.required ]],
    username: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
  })


  createUser() {
    this.usersFacade.createUser(this.form.value)
  }
}
