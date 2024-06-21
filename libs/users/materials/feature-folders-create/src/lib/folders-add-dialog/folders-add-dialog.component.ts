import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-folders-add-dialog',
  standalone: true,
  imports: [CommonModule, 
            MatDialogModule, 
            MatInputModule, 
            MatButtonModule, 
            ReactiveFormsModule, 
          ],
  templateUrl: './folders-add-dialog.component.html',
  styleUrls: ['./folders-add-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddDialogComponent {
  public dialogRef = inject(MatDialogRef<FoldersAddDialogComponent>);
  public newFolder = new FormControl("", Validators.required);

  save() {
      this.newFolder.valid && this.dialogRef.close(this.newFolder.value);
  }

  close() {
    this.dialogRef.close();
  }
}
