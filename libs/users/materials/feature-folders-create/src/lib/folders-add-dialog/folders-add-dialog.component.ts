import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FoldersAddButtonComponent } from '../folders-add-button/folders-add-button.component';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef: MatDialogRef<FoldersAddButtonComponent> = inject(MatDialogRef<FoldersAddButtonComponent>);

  public folderForm = this.fb.group({
    name: ['', Validators.required],
  });

  public save(): void {
    if (this.folderForm.valid) {
      this.dialogRef.close(this.folderForm.value);
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
