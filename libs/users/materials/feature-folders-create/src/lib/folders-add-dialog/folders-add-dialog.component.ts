import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
})
export class FoldersAddDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<FoldersAddDialogComponent>);

  public readonly folderTitle = new FormControl<string>('', { nonNullable : true, validators: [Validators.required] });

  public cancel(): void {
    this.dialogRef.close(false);
  }

  public save(): void {
    const formData = {
      title: this.folderTitle.value.trim()
    }
    this.dialogRef.close(formData)
  }
}
