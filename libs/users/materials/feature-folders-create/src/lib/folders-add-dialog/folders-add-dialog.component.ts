import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, FormsModule],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddDialogComponent {
  dialogRef = inject(MatDialogRef<FoldersAddDialogComponent>)
  form!: FormGroup

  constructor() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required])
    }
    )
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value)
    }
  }

  close() {
    this.dialogRef.close()
  }
}
