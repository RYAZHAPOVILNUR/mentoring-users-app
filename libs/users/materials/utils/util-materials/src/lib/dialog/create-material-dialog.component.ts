import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CreateMaterial, DialogData, MaterialType } from '@users/ui-materials';

import { UrlValidatorPipe } from './url-validator.pipe';
import { getLinkValidators } from './url-validator.util';

@Component({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButton,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    UrlValidatorPipe,
  ],
  templateUrl: './create-material-dialog.component.html',
  styleUrl: './create-material-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMaterialDialogComponent {
  private readonly dialogRef: MatDialogRef<CreateMaterialDialogComponent, CreateMaterial> = inject(MatDialogRef);
  private readonly fb = inject(FormBuilder);
  private readonly data: DialogData = inject(MAT_DIALOG_DATA);

  readonly materialType = this.data.type;
  readonly materialTypes = MaterialType;
  readonly newMaterialForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    material_link: ['', [Validators.required, getLinkValidators(this.materialType)]],
  });

  onCloseButtonClick(): void {
    return this.dialogRef.close(this.newMaterialForm.getRawValue());
  }
}
