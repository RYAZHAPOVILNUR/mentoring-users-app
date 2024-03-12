import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'users-add-folder-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './add-folder-dialog.component.html',
  styleUrls: ['./add-folder-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFolderDialogComponent {
  public dialog = inject(MatDialog);
  public folderName: FormControl = new FormControl('', Validators.required);
}
