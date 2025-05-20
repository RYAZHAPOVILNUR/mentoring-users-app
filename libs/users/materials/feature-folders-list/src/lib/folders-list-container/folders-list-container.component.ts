import { ChangeDetectionStrategy, Component, DestroyRef, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersFacade, FoldersType } from '@users/materials/data-access';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { LetDirective } from '@ngrx/component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from "@users/core/ui";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule,  MatProgressBarModule, FoldersListComponent,  LetDirective],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {

  private readonly foldersFacade = inject(FoldersFacade);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  public readonly folders$ = this.foldersFacade.allFolders$;
  public readonly status$ = this.foldersFacade.foldersStatus$;
  public readonly errors$ = this.foldersFacade.foldersError$;

  constructor(){
    this.foldersFacade.initFolders();
  }

    public openFolder(id: number) {
    this.router.navigate([`/materials/`, id])
  }
  
    public deleteFolder(folder: FoldersType): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(
      CoreUiConfirmDialogComponent,
      { data: { dialogText: `Вы уверены, что хотите удалить ${folder.title}` } }
    )

    dialogRef.afterClosed()
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((result: boolean) => {
        if(result) this.foldersFacade.deleteFolder(folder.id)
      })
    )
    .subscribe()
  }

}
