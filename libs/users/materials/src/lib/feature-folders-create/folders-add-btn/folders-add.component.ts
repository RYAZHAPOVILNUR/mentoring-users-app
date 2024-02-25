import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { first, tap } from 'rxjs';

@Component({
  selector: 'folders-add-btn',
  templateUrl: 'folders-add.component.html',
  standalone: true,
  imports: [MatIconModule],
})
export class FoldersAddComponent {
  @Output() postNewFolder = new EventEmitter();

  dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(FoldersAddDialogComponent);

    dialogRef.afterClosed().pipe(
      first(),
      tap(res => {if(res) this.postNewFolder.emit(res)})
    ).subscribe();
  }
}
