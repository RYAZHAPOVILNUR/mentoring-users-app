import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MaterialAdd, MaterialFormType } from '@users/materials/data-access';
import { linkValidator, MaterialFileType } from '@users/utils';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
  private readonly fb = inject(FormBuilder);
  public readonly MaterialFileType = MaterialFileType;
  private readonly dialogRef = inject(MatDialogRef);
  public readonly data: MaterialFileType = inject(MAT_DIALOG_DATA);

  public readonly formGroup: FormGroup<MaterialFormType<Omit<MaterialAdd, 'folder_id'>>> = this.fb.group({
    title: ['', Validators.required],
    material_link: ['', [Validators.required, linkValidator(this.data)]],
  });

  public onAddMaterial(): void {
    if(this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value);
    }
  }
}
