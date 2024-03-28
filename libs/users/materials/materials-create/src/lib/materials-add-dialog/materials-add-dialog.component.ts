import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CreateMaterial } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-add-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './materials-add-dialog.component.html',
  styleUrls: ['./materials-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<MaterialsAddDialogComponent>);
  private readonly formBuilder = inject(FormBuilder);
  public readonly formGroup = this.formBuilder.group({
    title: ['', Validators.required],
    link: ['', Validators.required]
  });
  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: { type: string }) {}

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.formGroup.valid) {
      const data: Partial<CreateMaterial> = {
        title: this.formGroup.value.title!,
        material_link: this.formGroup.value.link!
      }
      this.dialogRef.close(data);
    }
  }
}
