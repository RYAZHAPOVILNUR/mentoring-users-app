import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { FoldersFacade, IFolder } from '@users/materials/data-access';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { FoldersListComponent } from '../folders-list/folders-list.component';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersAddButtonComponent, FoldersListComponent, LetDirective],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MatSnackBar],
})
export class FoldersListContainerComponent implements OnInit {
  public readonly foldersFacade = inject(FoldersFacade);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);
  public readonly folders$ = this.foldersFacade.allFolders$;
  public readonly status$ = this.foldersFacade.status$;
  public readonly errors$ = this.foldersFacade.errors$;

  ngOnInit(): void {
    this.foldersFacade.loadFolders();
  }

  onDeleteFolder(folder: IFolder): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить папку ${folder.title}?` },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: boolean) => {
        if (result) {
          this.foldersFacade.deleteFolder(folder.id);
          this.snackBar.open('Папка успешно удалена!', 'Закрыть', { duration: 4000 });
        }
      });
  }

  public onOpenFolder(id: number) {
    this.router.navigateByUrl(`/materials/${id}`);
  }
}
