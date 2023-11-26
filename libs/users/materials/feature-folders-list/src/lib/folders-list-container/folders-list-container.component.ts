import { ChangeDetectionStrategy, Component, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFolder, MaterialsFacade } from '@users/materials/data-access';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CoreUiConfirmDialogComponent } from "@users/core/ui";
import { LetDirective } from '@ngrx/component';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { tap } from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule,
    FoldersListComponent,
    MatProgressBarModule,
    LetDirective
  ],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);

  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  public readonly foldersStatus$ = this.materialsFacade.foldersStatus$;
  public readonly allFolders$ = this.materialsFacade.allFolders$;

  constructor() {
    this.materialsFacade.loadFolders()
  }

  public openFolder(id: number) {
    this.router.navigate([`/materials/`, id])
  }

  public deleteFolder(folder: IFolder): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(
      CoreUiConfirmDialogComponent,
      { data: { dialogText: `Вы уверены, что хотите удалить ${folder.title}` } }
    )

    dialogRef.afterClosed()
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((result: boolean) => {
        if(result) this.materialsFacade.deleteFolder(folder.id)
      })
    )
    .subscribe()
  }
}
