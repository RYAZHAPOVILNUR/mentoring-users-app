import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-create-folders-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './create-folders-dialog.component.html',
  styleUrls: ['./create-folders-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFoldersDialogComponent {
  public formGroup: FormGroup;
  private readonly dialogRef = inject(MatDialogRef<CreateFoldersDialogComponent>);
  // private data: { title: string } = inject(MAT_DIALOG_DATA);
  private readonly formBuilder = inject(FormBuilder);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string }) {
    // this.formGroup = this.formBuilder.group({
    //   name: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    // });
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
    });
  }

  // public formGroup = this.formBuilder.group({
  //   title: ['', Validators.required],
  // });

  public cancel(): void {
    this.dialogRef.close();
  }

  public save(): void {
    if (this.formGroup.valid) {
      const formData = {
        title: this.formGroup.value.title,
      };
      this.dialogRef.close(formData);
    }
  }
}
