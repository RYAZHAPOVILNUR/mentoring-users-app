import { ChangeDetectionStrategy, Component, DestroyRef, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SharedFacade } from '../../../../data-access/src/lib/+state/sharedFacade';
import { CreateFolderDTO } from '../../../../data-access/src/lib/models/folders-dto.model';
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
  public dialog = inject(MatDialog);
  public title!: string;
  private readonly destroyRef = inject(DestroyRef);
  private readonly facadeF = inject(SharedFacade);

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
        };
        this.facadeF.addFolder(newFolderData);
      }
    });
  }
}
