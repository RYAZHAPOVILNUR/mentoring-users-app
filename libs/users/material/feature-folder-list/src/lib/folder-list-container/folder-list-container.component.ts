import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderListComponent } from '../folder-list/folder-list.component';
import { LetDirective } from '@ngrx/component';
import { MaterialFacade } from '@users/material';
import { Router } from '@angular/router';
import { FolderAddButtonComponent } from '@users/folder-create';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-folder-list-container',
  standalone: true,
  imports: [CommonModule, FolderListComponent, LetDirective, FolderAddButtonComponent, MatTooltipModule],
  templateUrl: './folder-list-container.component.html',
  styleUrls: ['./folder-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderListContainerComponent {
  private readonly router = inject(Router);
  public materialFacade = inject(MaterialFacade);
  public readonly folders$ = this.materialFacade.folders$;
  public readonly status$ = this.materialFacade.status$;
  public readonly error$ = this.materialFacade.error$;
  public dialog = inject(MatDialog);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.init();
  }

  private init(): void {
    this.materialFacade.initFolders();
  }

  public onDeleteFolder(id: number): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить папку?` },
    });

    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((result: boolean) => {
          if (result) this.materialFacade.deleteFolder(id);
        })
      )
      .subscribe();
  }

  public onRedirectMaterial({ name, id }: { name: string; id: number }): void {
    this.router.navigate(['materials', id], {
      queryParams: { name: name },
    });
  }
}
