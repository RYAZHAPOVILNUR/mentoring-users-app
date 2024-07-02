import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderType, MaterialsFacade } from '@users/materials/data-access';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { LetDirective } from '@ngrx/component';

import { MatDialog } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, FoldersListComponent, LetDirective],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent implements OnInit {
  private readonly materialsFacade = inject(MaterialsFacade);

  public readonly allFolders$ = this.materialsFacade.allFolders$;
  public readonly foldersStatus$ = this.materialsFacade.foldersStatus$;

  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public onDeleteFolder(folder: FolderType) {
    console.log(folder)
    const dialogRef = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: {diologText: `Вы уверены, что хотите удалить ${folder.title}`}
    });

    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((result) => {
        if(result) this.materialsFacade.deleteFolder(folder.id)
      })
    ).subscribe()
  }

  ngOnInit() {
    this.materialsFacade.initFolders();
  }
}
