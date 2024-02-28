import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'folders-add-dialog',
  templateUrl: 'folders-add-dialog.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class FoldersAddDialogComponent {
  dialogRef = inject(MatDialogRef<FoldersAddDialogComponent>);
  nameFolder = new FormControl('', [Validators.required]);

  initNewFolder(): void {
    if (this.nameFolder.valid) {
      this.dialogRef.close(this.nameFolder.value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
