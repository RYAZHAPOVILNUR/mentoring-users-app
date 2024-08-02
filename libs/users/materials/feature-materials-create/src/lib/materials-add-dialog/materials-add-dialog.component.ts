import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EMaterialFile, materialLinkValidator } from '@users/materials/data-access';

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
  private readonly dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);
  public readonly data = inject(MAT_DIALOG_DATA);
  public readonly eMaterialFile = EMaterialFile;

  public materialsForm = this.fb.group({
    title: ['', Validators.required],
    link: ['', [Validators.required, materialLinkValidator(this.data)]],
  });

  public save(): void {
    if (this.materialsForm.valid) {
      this.dialogRef.close(this.materialsForm.value);
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
