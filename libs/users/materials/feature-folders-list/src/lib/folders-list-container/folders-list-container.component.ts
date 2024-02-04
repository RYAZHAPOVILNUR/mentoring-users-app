import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersAddButtonComponent, FoldersAddDialogComponent } from '@users/feature-folders-create';
import { LetDirective } from '@ngrx/component';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { MaterialsFacade } from '@users/materials/data-access';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { CreateFolder, Folder } from '../../../../data-access/src/lib/models/folder.models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersAddButtonComponent, LetDirective, FoldersCardComponent, FoldersListComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersListContainerComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);
  private readonly materialsFacade = inject(MaterialsFacade);
  public readonly folders$ = this.materialsFacade.folders$;
  public readonly errors$ = this.materialsFacade.errors$;
  public readonly status$ = this.materialsFacade.status$;

  ngOnInit() {
    this.materialsFacade.init();
  }

  onAddFolder() {
    const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog.open(FoldersAddDialogComponent);
    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        if (result) {
          const newFolder: CreateFolder = {
            title: result.title
          };
          this.materialsFacade.addFolder(newFolder);
        }
      });
  }

  deleteFolder(folder: Folder) {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${folder.title}` }
    });
    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.materialsFacade.deleteFolder(folder.id);
        }
      });
  }

  openFolder(id: number) {
    this.router.navigate(['/materials', id]);
  }
}
