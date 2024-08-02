import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FolderType, MaterialsFacade } from '@users/materials/data-access';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { MatButtonModule } from '@angular/material/button';
import { LetDirective } from '@ngrx/component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [
    CommonModule,
    FoldersListComponent,
    FoldersAddButtonComponent,
    MatButtonModule,
    MatDialogModule,
    LetDirective,
    MatProgressBarModule,
  ],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent implements OnInit {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  public readonly allFolders$ = this.materialsFacade.allFolders$;
  public readonly foldersStatus$ = this.materialsFacade.foldersStatus$;

  ngOnInit(): void {
    this.materialsFacade.loadFolders();
  }

  public onOpenFolder(id: number): void {
    this.router.navigate(['/materials/', id]);
  }

  public onDeleteFolder(folder: FolderType): void {
    const dialogRef = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Точно удалить ${folder.title}?` },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.materialsFacade.deleteFolders(folder.id);
        }
      });
  }
}
