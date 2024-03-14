import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { IFolderCreate } from '@users/materials/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialsFacade } from '@users/materials/data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTooltipModule, MatIconModule],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersAddButtonComponent {
  private materialsFacade = inject(MaterialsFacade);
  private title!: string;
  private readonly destroyRef = inject(DestroyRef);
  public dialog = inject(MatDialog);

  onOpenDialog() {
    const dialogRef = this.dialog.open(FoldersAddDialogComponent, {
      data: { title: this.title },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const dataFolder: IFolderCreate = {
            title: result,
          };
          this.materialsFacade.addFolder(dataFolder);
        }
      });
  }
}
