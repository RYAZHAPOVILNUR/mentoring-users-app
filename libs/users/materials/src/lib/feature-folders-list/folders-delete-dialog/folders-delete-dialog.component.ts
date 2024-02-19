import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  inject,
  TemplateRef,
} from '@angular/core';
import {
  typeFolderVM,
  typeMaterial,
} from '../../../../data-access/src/lib/folders-materials-types/folders-materials-types';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'folder-delete',
  templateUrl: './folders-delete-dialog.component.html',
  standalone: true,
  imports: [MatListModule, MatIconModule],
})
export class DeleteFolderComponent {
  dialogRef = inject(MatDialogRef<DeleteFolderComponent>);
  dialog = inject(MatDialog);
  dialogData: { folder: typeFolderVM } = inject(MAT_DIALOG_DATA);

  closeDeleteDialog(id?: number) {
    this.dialogRef.close(id);
  }
}
