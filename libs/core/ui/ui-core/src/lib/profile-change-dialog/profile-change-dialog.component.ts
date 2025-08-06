import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';

import { AddressType } from '@shared/data-access-address';
import { AddressFieldComponent } from '@shared/feature-address-field';
import { UserEntity } from '@users/shared/data-access-models';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AddressFieldComponent,
    MatFormFieldModule,
    MatTooltipModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './profile-change-dialog.component.html',
  styleUrls: ['./profile-change-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileChangeDialogComponent {
  public userEntityData: UserEntity = inject(MAT_DIALOG_DATA);

  readonly addressTypes = AddressType;

  public formGroup = new FormBuilder().group({
    name: new FormControl(this.userEntityData.name, [Validators.required]),
    city: new FormControl(this.userEntityData.city, [Validators.required]),
    email: new FormControl(this.userEntityData.email, [Validators.required, Validators.email]),
  });
}
