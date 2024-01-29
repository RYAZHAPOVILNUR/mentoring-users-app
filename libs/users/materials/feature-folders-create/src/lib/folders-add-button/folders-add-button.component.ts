import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MaterialsFacade } from '@users/materials/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CreateIFolder } from '../../../../data-access/src/lib/models/folder.interface';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersAddButtonComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);
  public dialog = inject(MatDialog);

  onAddFolder(): void {
    const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog.open(FoldersAddDialogComponent);
    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          const newFolder: CreateIFolder = {
            title: result.title
          };
          this.materialsFacade.addFolder(newFolder);
        }
      });
  }


}
