import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialType } from '@users/users/materials/data-access';
import { TranslateModule } from '@ngx-translate/core';
import { materialLinkValidator } from './validators';
import { CreateMaterialsDialogRef } from '../types/create-materials-dialog-ref';
import { DeepReadonly } from '@users/core/utils';

type CreateMaterialsDialogData = DeepReadonly<{
  materialType: MaterialType,
  folderId: number,
}>;

@Component({
  selector: 'users-create-materials-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    TranslateModule,
  ],
  templateUrl: './create-materials-dialog.component.html',
  styleUrls: ['./create-materials-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMaterialsDialogComponent {
  public readonly materialData: CreateMaterialsDialogData = inject(MAT_DIALOG_DATA);
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef: CreateMaterialsDialogRef = inject(MatDialogRef);

  public readonly formGroup = this.fb.nonNullable.group({
    title: ['', { validators: [Validators.required]}],
    materialLink: ['', {
      validators: [
        Validators.required,
        materialLinkValidator(this.materialData.materialType),
      ],
    }],
  });

  public save(): void {
    this.dialogRef.close({
      ...this.formGroup.getRawValue(),
      folderId: this.materialData.folderId,
    });
  }
}
