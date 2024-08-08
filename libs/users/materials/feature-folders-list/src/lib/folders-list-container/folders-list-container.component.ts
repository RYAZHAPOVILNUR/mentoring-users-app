import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Folder, MaterialsFacade } from '@users/materials/data-access';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { LetDirective } from '@ngrx/component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, LetDirective],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  public readonly folders$ = this.materialsFacade.allFolders$;
  public readonly status$ = this.materialsFacade.foldersStatus$;
  public readonly errors$ = this.materialsFacade.foldersErrors$;
  public readonly router = inject(Router)
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.materialsFacade.loadFolders();
  }

  public onDeleteFolder(folder: Folder) {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${folder.title}`}
    });
    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe(result => {
      if (result) this.materialsFacade.deleteFolder(folder.id)
    });
  }

  public onOpenFolder(id: number) {
    this.router.navigate(['/materials', id]);
  }
}

