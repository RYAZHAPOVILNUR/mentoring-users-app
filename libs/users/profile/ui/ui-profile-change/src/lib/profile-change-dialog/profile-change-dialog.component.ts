import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

import { AddressType } from '@shared/data-access-address';
import { AddressFieldComponent } from '@shared/feature-address-field';

import { ProfileChangeDialogCloseData } from '../profile-change-dialog-close-data.type';
import { ProfileChangeDialogData } from '../profile-change-dialog-data.type';

type DialogRef = MatDialogRef<ProfileChangeDialogComponent, ProfileChangeDialogCloseData>;

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    TranslateModule,
    AddressFieldComponent,
  ],
  templateUrl: './profile-change-dialog.component.html',
  styleUrls: ['./profile-change-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileChangeDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject<DialogRef>(MatDialogRef);
  private readonly data = inject<ProfileChangeDialogData>(MAT_DIALOG_DATA);

  readonly addressTypes = AddressType;

  readonly formGroup = this.fb.nonNullable.group({
    name: [this.data.name, [Validators.required]],
    city: [this.data.city, [Validators.required]],
    email: [this.data.email, [Validators.required, Validators.email]],
  });

  onFormSubmit(): void {
    this.dialogRef.close(this.formGroup.value);
  }
}
