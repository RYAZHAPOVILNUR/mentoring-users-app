import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderDTO, FoldersFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { FoldersListComponent } from "../folders-list/folders-list.component";
import { FoldersAddButtonComponent } from '@users/feature-folders-create';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, LetDirective, FoldersListComponent, FoldersAddButtonComponent, MatSnackBarModule],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent implements OnInit {
  public foldersFacade = inject(FoldersFacade);
  private readonly router = inject(Router);
  folders$ = this.foldersFacade.allFolders$;
  status$ = this.foldersFacade.status$;
  errors$ = this.foldersFacade.errors$;
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar)
  private readonly destroyRef = inject(DestroyRef);
  
  ngOnInit(): void {
    this.foldersFacade.loadFolders();
  }

  onDeleteFolder(folder: FolderDTO): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(
      CoreUiConfirmDialogComponent,
      { data: { dialogText: `Вы уверены, что хотите удалить папку ${folder.title}?` } }
    );
    dialogRef.afterClosed()
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((result: boolean) => {
        console.log('Deleting folder with ID:', folder.id);
        if (result) {
          this.foldersFacade.deleteFolder(folder.id);
          this.snackBar.open('Папка успешно удалена!', 'Закрыть', { duration: 3000 });
        }
      })
      
      
    )
    .subscribe();
  } 


  public onOpenFolder(id: number) {
    this.router.navigate([`/materials/`, id])
  }
}