import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {UsersEntity, UsersFacade} from "@users/users/data-access";
import {usersVMAdapter} from "../../../../users-vm.adapter";

@Component({
  selector: 'users-create-users-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, NgOptimizedImage, ReactiveFormsModule, MatInputModule],
  templateUrl: './create-users-dialog.component.html',
  styleUrls: ['./create-users-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUsersDialogComponent {
  public form: FormGroup;
  private facade: UsersFacade = inject(UsersFacade);
  private fb: FormBuilder = inject(FormBuilder)
  private dialogRef: MatDialogRef<CreateUsersDialogComponent> = inject(MatDialogRef)

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  onSubmit() {
    if (this.form.valid) {
      const {name, username, email} = this.form.value
      const user: UsersEntity = usersVMAdapter.VMtoEntity({
        id: Date.now(), name, username, email
      })
      this.facade.createUser(user)
      this.dialogRef.close()
    } else {
      this.markFormGroupTouched(this.form);
    }
  }

  onCancel() {
    this.form.reset();
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
