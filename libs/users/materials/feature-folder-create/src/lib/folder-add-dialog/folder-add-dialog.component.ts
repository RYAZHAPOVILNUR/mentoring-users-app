import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { FoldersFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-folder-add-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './folder-add-dialog.component.html',
  styleUrls: ['./folder-add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderAddDialogComponent {
  // private readonly dialogRef = inject(MatDialogRef);
  readonly dialogRef = inject(MatDialogRef<FolderAddDialogComponent>);
  private readonly folderFacade = inject(FoldersFacade);
  public readonly folderName = new FormControl('');

  constructor() {
    this.folderName.valueChanges.subscribe((value) => {
      console.log('Value', value);
    });
  }

  onCreateFolder(folderName: any) {
    this.folderFacade.createFolder(folderName);
  }
}
