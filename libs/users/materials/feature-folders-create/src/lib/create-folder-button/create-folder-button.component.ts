import { ChangeDetectionStrategy, Component, DestroyRef, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CreateFolderDTO } from '../../../../data-access/src/lib/models/folders-dto.model';
import {
  FoldersListContainerStore
} from '../../../../feature-folders-list/src/lib/folders-list-container/folders-list-container.store';
import { CreateFolderDialogComponent } from '../create-folder-dialog/create-folder-dialog.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'create-folder-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './create-folder-button.component.html',
  styleUrls: ['./create-folder-button.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFolderButtonComponent {
  private title!: string;
  public dialog = inject(MatDialog);
  private readonly componentStore = inject(FoldersListContainerStore);
  private readonly destroyRef = inject(DestroyRef);

  openAddFolderDialog() {
    const dialogRef = this.dialog.open(CreateFolderDialogComponent, {
      data: { title: this.title },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
      if (result) {
        const newFolderData: CreateFolderDTO = {
          title: result.title,
        }
        this.componentStore.addFolder(newFolderData);
      }
    });
  }
}
