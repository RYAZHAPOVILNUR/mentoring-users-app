import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import {
  FoldersAddButtonComponent
} from '../../../../feature-folders-create/folders-add-button/folders-add-button.component';
import { FoldersFacade } from '@users/materials/data-access';
import { FoldersSecondModel } from '../../../../folders-model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, LetDirective, FoldersListComponent, FoldersAddButtonComponent, MatSnackBarModule, MatProgressBarModule],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FoldersListContainerComponent implements OnInit{
  public readonly foldersFacade = inject(FoldersFacade);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  public readonly folders$ = this.foldersFacade.allFolders$;
  public readonly status$ = this.foldersFacade.status$;
  public readonly errors$ = this.foldersFacade.errors$;

  ngOnInit(): void {
    this.foldersFacade.loadFolders();
  }

  onDeleteFolder(folder: FoldersSecondModel): void {
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

  onOpenFolder(id: number): void {
    this.router.navigate(['/materials', id])
  }
}
