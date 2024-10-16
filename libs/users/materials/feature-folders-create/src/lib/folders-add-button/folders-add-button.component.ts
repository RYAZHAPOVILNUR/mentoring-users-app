import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectFolders } from '@users/materials/data-access';
import { IFolder } from '../../../../data-access/src/lib/models/folder.interface';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateFolderDTO } from '../../../../data-access/src/lib/models/folders-dto.model';
import { FoldersFacade } from '../../../../data-access/src/lib/+state/folders/folders.facade';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersAddButtonComponent {
  private name!: string;
  public readonly dialog = inject(MatDialog);
  private store = inject(Store<IFolder>);
  public readonly folders$ = this.store.select(selectFolders);
  private readonly destroyRef = inject(DestroyRef);
  private readonly foldersFacade = inject(FoldersFacade);


  public openAddFolderDialog(): void {
    const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog.open(FoldersAddDialogComponent, {
      width: '450px',
      data: { name: this.name }
    });

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          const newFolder: CreateFolderDTO = {
            title: result.title
          };
          this.foldersFacade.addFolder(newFolder);
        }
      });
  }
}
