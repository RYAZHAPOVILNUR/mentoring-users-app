import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Folder, MaterialsFacade } from '@users/materials-data-access';
import { LetDirective } from '@ngrx/component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { AddFolderButtonComponent, DeleteFolderDialogComponent } from '@users/feature-manage-folder';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialStateService } from '../../../../services/material-state.service';

@Component({
  selector: 'folders-list-container',
  standalone: true,
  imports: [CommonModule, LetDirective, MatProgressBarModule, FoldersListComponent, AddFolderButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent implements OnInit {
  private readonly _dialog: MatDialog = inject(MatDialog);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _router = inject(Router);
  private readonly _activeRoute = inject(ActivatedRoute);
  private readonly _materialStateService: MaterialStateService = inject(MaterialStateService);
  public readonly materialsFacade = inject(MaterialsFacade);

  ngOnInit() {
    this.materialsFacade.loadFolders();
    this._subscribeToDeleteFolder();
    this._subscribeToOpenFolder();
    this._subscribeToAddFolder();
  }

  private _subscribeToAddFolder(): void {
    this._materialStateService.addFolder$
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((title: string) => this.materialsFacade.addFolder(title))
      )
      .subscribe();
  }

  private _subscribeToDeleteFolder(): void {
    this._materialStateService.deleteFolder$
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap(({ id, title }) => this._openDeleteDialog({ id, title }))
      )
      .subscribe();
  }

  private _openDeleteDialog({ id, title }: Omit<Folder, 'created_at'>): void {
    const dialogRef: MatDialogRef<DeleteFolderDialogComponent> = this._dialog.open(DeleteFolderDialogComponent, {
      data: { id, title },
    });
    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((id) => {
          if (id) {
            this.materialsFacade.deleteFolder(id);
          }
        })
      )
      .subscribe();
  }

  private _subscribeToOpenFolder(): void {
    this._materialStateService.openFolder$
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap((id) => this.openFolder(id))
      )
      .subscribe();
  }

  public openFolder(id: number): void {
    this._router.navigate([id], { relativeTo: this._activeRoute });
  }
}
