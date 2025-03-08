import { ChangeDetectionStrategy, Component, Inject, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [CommonModule,  MatDialogModule, FormsModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddDialogComponent {

  public dialogRef = inject(MatDialogRef<FoldersAddDialogComponent>);

  private formBuilder = inject(FormBuilder);

  public formGroup: FormGroup;

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
