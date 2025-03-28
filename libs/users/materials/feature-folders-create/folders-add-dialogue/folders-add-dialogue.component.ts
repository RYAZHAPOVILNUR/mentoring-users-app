import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'users-folders-add-dialogue',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './folders-add-dialogue.component.html',
  styleUrls: ['./folders-add-dialogue.component.scss'],
})
export class FoldersAddDialogueComponent {
  public formGroup: FormGroup;
  private formBuilder = inject(FormBuilder);
  public dialogRef = inject(MatDialogRef<FoldersAddDialogueComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; id: string }) {
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      id: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.formGroup.valid) {
      const formData = {
        title: this.formGroup.value.title,
        id: this.formGroup.value.id,
      };
      this.dialogRef.close(formData);
    }
  }
}
