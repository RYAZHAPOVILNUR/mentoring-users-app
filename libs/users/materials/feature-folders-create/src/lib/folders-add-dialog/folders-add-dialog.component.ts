import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'materials-folders-add-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<FoldersAddDialogComponent>);
  public readonly form = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
  });

  public onCancelAddFolder(): void {
    this.dialogRef.close();
  }

  public onAddFolder(): void {
    if (this.form.value) {
      const formData = {
        title: this.form.value.title,
      };
      this.dialogRef.close(formData);
    }
  }
}
