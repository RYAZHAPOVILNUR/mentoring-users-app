import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatDialogModule, MatButtonModule, MatInputModule],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersAddDialogComponent {
  public formControlFolderName: FormControl = new FormControl('', Validators.required)
  public dialogRef: MatDialogRef<FoldersAddDialogComponent> = inject(MatDialogRef<FoldersAddDialogComponent>);

  public cancel(): void {
    this.dialogRef.close();
  }

  public save(): void {
    if (this.formControlFolderName.valid && this.formControlFolderName.value) {
      const folderName: string = this.formControlFolderName.value;
      this.dialogRef.close(folderName);
    }
  }
}
