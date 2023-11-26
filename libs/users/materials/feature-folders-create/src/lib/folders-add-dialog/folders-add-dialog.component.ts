import { ChangeDetectionStrategy, Component, inject, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersAddDialogComponent {
  public formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<FoldersAddDialogComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { folderTitle: string },) {
    this.formGroup = this.formBuilder.group({
      folderTitle: ['', Validators.required]
    })
  }

  close(): void {
    this.dialogRef.close()
  }

  save(): void {
    if (this.formGroup.valid) {
      const newFolder = {
        folderTitle: this.formGroup.value.folderTitle
      }

      this.dialogRef.close(newFolder)
    }
  }
}
