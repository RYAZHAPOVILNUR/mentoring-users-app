import { ChangeDetectionStrategy, Component, DestroyRef, inject, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FolderAdd, MaterialsFacade } from '@users/materials/data-access';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule, MatButtonModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);
  public dialog = inject(MatDialog);

  openAddFolderDialog() {
    const dialogRef = this.dialog.open(FoldersAddDialogComponent, {});

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if(result) {
          const data: FolderAdd = { title: result.name };
          this.materialsFacade.addFolder(data);
        }
      })
  }
}
