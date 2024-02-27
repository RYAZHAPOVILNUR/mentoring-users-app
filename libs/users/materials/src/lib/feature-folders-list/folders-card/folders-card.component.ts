import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  inject,
  TemplateRef,
} from '@angular/core';
import { FolderVM } from '../../../../data-access/src/lib/folders-materials-types/folders-materials-types';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { DeleteFolderComponent } from '../folders-delete-dialog/folders-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { first, tap } from 'rxjs';
import { GetDatePipe } from '../../pipe-date-adapter/date-adapter.pipe';

@Component({
  selector: 'folders-card',
  templateUrl: 'folders-card.component.html',
  standalone: true,
  imports: [MatListModule, MatIconModule, GetDatePipe],
  providers: [GetDatePipe],
})
export class FoldersCardComponent {
  @Input({ required: true })
  folder!: FolderVM;

  @Output() selectFolder = new EventEmitter<number>();
  @Output() deleteFolder = new EventEmitter<number>();

  private dialog = inject(MatDialog);

  openDeleteDialog() {
    let dialogRef = this.dialog.open(DeleteFolderComponent, {
      width: '300px',
      data: {
        folder: this.folder,
      },
    });
    dialogRef
      .afterClosed()
      .pipe(
        first(),
        tap((id) => {
          if (id) this.deleteFolder.emit(+id);
        })
      )
      .subscribe();
  }
}
