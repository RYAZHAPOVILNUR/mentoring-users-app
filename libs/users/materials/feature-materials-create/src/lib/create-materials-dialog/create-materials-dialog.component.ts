import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'create-materials-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './create-materials-dialog.component.html',
  styleUrls: ['./create-materials-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMaterialsDialogComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<CreateMaterialsDialogComponent>);
  private readonly data: {
    dialogText: string;
    folder_id$: number;
    materialFormat: string;
  } = inject(MAT_DIALOG_DATA);

  public readonly dialogText: string = this.data.dialogText;

  public readonly formGroup: FormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    materialLink: ['', Validators.required],
    folderId: [this.data.folder_id$, Validators.required],
    materialFormat: [this.data.materialFormat, Validators.required],
  });

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;
      this.dialogRef.close(formData);
    }
  }
}
