import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FoldersDTO } from '@users/core/data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'edit-folders-dialog',
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
  templateUrl: './edit-folders-dialog.component.html',
  styleUrls: ['./edit-folders-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditFoldersDialogComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dialogRef = inject(MatDialogRef<EditFoldersDialogComponent>);
  private readonly data: { dialogText: string; folderData: FoldersDTO } = inject(MAT_DIALOG_DATA);

  public readonly dialogText: string = this.data.dialogText;

  public readonly formGroup: FormGroup = this.formBuilder.group({
    title: [this.data.folderData.title, Validators.required],
    id: [this.data.folderData.id, Validators.required],
  });

  public cancel(): void {
    this.dialogRef.close();
  }

  public save(): void {
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;
      this.dialogRef.close(formData);
    }
  }
}
