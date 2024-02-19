import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  inject,
  TemplateRef,
} from '@angular/core';
import { typeFolderVM } from '../../../../data-access/src/lib/folders-materials-types/folders-materials-types';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { DeleteFolderComponent } from '../folders-delete-dialog/folders-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'folders-card',
  templateUrl: 'folders-card.component.html',
  standalone: true,
  imports: [MatListModule, MatIconModule],
})
export class FoldersCardComponent {
  @Input({ required: true })
  folder!: typeFolderVM;

  @Output() selectFolder = new EventEmitter();
  @Output() deleteFolder = new EventEmitter();

  dialog = inject(MatDialog);

  onSelectFolder(id: number) {
    this.selectFolder.emit(id);
  }

  onDeleteFolder(id: number) {
    this.deleteFolder.emit(+id);
  }

  getDate(): string {
    let date = new Date(this.folder.created_at);
    return `
		${String(date.getDate()).padStart(2, '0')}.
		${String(date.getDay() + 1).padStart(2, '0')}.
		${date.getFullYear()}`;
  }

  openDeleteDialog() {
    let dialogRef = this.dialog.open(DeleteFolderComponent, {
      width: '300px',
      data: {
        folder: this.folder,
      },
    });
    dialogRef.afterClosed().subscribe((id) => {
      if (id) this.deleteFolder.emit(+id);
    });
  }
}
