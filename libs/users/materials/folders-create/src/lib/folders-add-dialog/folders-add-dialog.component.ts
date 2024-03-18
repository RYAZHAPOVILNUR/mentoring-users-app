import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersAddDialogComponent {
  public formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<FoldersAddDialogComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string }
  ) {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required]
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value.title);
    }
  }
}
