import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FolderCreateEditDialogComponent } from '../folder-create-edit-dialog/folder-create-edit-dialog.component';
import { FolderCreateEditDialogService } from '../../services/folder-create-edit-dialog.service';

@Component({
  standalone: true,
  selector: 'users-folder-add-button',
  templateUrl: './folder-add-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
})
export class FolderAddButtonComponent {
  private readonly createEditFolderDialog = inject(
    FolderCreateEditDialogService
  );

  public openAndCompleteDialog() {
    this.createEditFolderDialog.open(FolderCreateEditDialogComponent);
  }
}
