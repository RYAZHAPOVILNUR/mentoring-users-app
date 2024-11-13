import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreateFoldersButtonComponent } from '@users/materials/feature-folders-create';
import { Folder, MaterialsFacade } from '@users/materials/data-access';
import { LetDirective, PushPipe } from '@ngrx/component';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { UsersListComponent } from '@users/feature-users-list';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    MatIconModule,
    CreateFoldersButtonComponent,
    LetDirective,
    FoldersListComponent, PushPipe, UsersListComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  public readonly status$ = this.materialsFacade.status$;
  public readonly allFolders$ = this.materialsFacade.allFolders$;
  public readonly errors$ = this.materialsFacade.error$;
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  constructor() {
    this.materialsFacade.loadFolder()
  }

  public onDeleteFolder(folder: Folder): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${folder.title}` },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result: boolean) => {
        if (result) this.materialsFacade.deleteFolder(folder.id);
      })
  }

  public onOpenFolder(id: number) {
    this.router.navigate([`/materials/`, id])
  }
}
