import { ChangeDetectionStrategy, Component, Inject, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface FolderFormData {
  folderName: string;
}

@Component({
  selector: 'users-folders-add-dialog',
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
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddDialogComponent {
  public folderAddFormGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<FoldersAddDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { folderName: string }) {
    this.folderAddFormGroup = this.formBuilder.group({
      folderName: ['', Validators.required],
    });
  }

  save(): void {
    if (this.folderAddFormGroup.valid) {
      const formData: FolderFormData = {
        folderName: this.folderAddFormGroup.value.folderName,
      };
      this.dialogRef.close(formData);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
