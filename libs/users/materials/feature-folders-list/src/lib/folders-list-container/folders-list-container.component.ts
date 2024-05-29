import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { FoldersFacade, TFolderDTO } from '@users/materials/data-access';
import { LetDirective, PushPipe } from '@ngrx/component';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-feature-folders-list',
  standalone: true,
  imports: [
    CommonModule,
    FoldersListComponent,
    FoldersAddButtonComponent,
    LetDirective,
    PushPipe,
  ],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
})
export class FoldersListContainerComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly foldersFacade = inject(FoldersFacade);
  private readonly destroyRef = inject(DestroyRef);
  public readonly folders$ = this.foldersFacade.folders$;
  public readonly status$ = this.foldersFacade.status$;
  public readonly error$ = this.foldersFacade.error$;

  ngOnInit(): void {
    this.foldersFacade.loadFolders();
  }

  public onDeleteFolder(folder: TFolderDTO) {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${folder.title}` },
    });
    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((result: boolean) => {
        if (result) this.foldersFacade.deleteFolder(folder);
      }),
    ).subscribe();
  }
}
