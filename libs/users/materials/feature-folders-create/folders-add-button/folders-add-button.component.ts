import { ChangeDetectionStrategy, Component, DestroyRef, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { FolderCreate, MaterialsFacade } from '../../data-access/src';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldesAddButtonComponent {
  readonly dialog = inject(MatDialog);
  materialsFacade = inject(MaterialsFacade);
  destroyRef = inject(DestroyRef);
  //создал некорреткно lib постараюсь проработать это
  addFolderCreate() {
    const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog.open(FoldersAddDialogComponent);
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      if(res){
        const newFolderData: FolderCreate = {title: res};
        this.materialsFacade.addFolders(newFolderData);
      }
    })
  }
}export { FoldersAddDialogComponent };


