import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { MaterialsFacade } from '../../../../data-access/src/lib/+state/materials.facade';
import { LetDirective } from '@ngrx/component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { IFolder } from '@users/materials/data-access';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, LetDirective, MatProgressBarModule],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
})
export class FoldersListContainerComponent {
  materialsFacade = inject(MaterialsFacade);
  confirmDialog = inject(MatDialog);

  folders$ = this.materialsFacade.folders$;
  status$ = this.materialsFacade.status$;

  constructor() {
    this.materialsFacade.init();
  }

  addFolder(folderName: string): void {
      this.materialsFacade.addFolder(folderName);
  }

  onDeleteFolder({ id, title }: IFolder): void {
    const dialogRef = this.confirmDialog.open(CoreUiConfirmDialogComponent, {
      data: {
        dialogText: `Вы уверены, что хотите удалить ${title}`,
      },
    });

    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.materialsFacade.deleteFolder(id);
      }
    });
  }
}

