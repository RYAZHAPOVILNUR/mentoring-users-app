import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'users-feature-folders-create',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, MatDialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './feature-folders-create.component.html',
  styleUrls: ['./feature-folders-create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureFoldersCreateComponent {
  dialogRef = inject(MatDialogRef);
  folderName = new FormControl('', [Validators.required, Validators.pattern(/^(?!\s*$).+/)]);

  saveFolderName(): void {
    this.dialogRef.close(this.folderName.value);
  }
}
