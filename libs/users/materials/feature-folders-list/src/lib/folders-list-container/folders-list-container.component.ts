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
  public readonly materialsFacade = inject(MaterialsFacade);
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private materialStateService: MaterialStateService = inject(MaterialStateService);

  ngOnInit() {
    this.materialsFacade.loadFolders();
    this.subscribeToDeleteFolder();
    this.subscribeToOpenFolder();
    this.subscribeToAddFolder();
  }

  private subscribeToAddFolder() {
    this.materialStateService.addFolder$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((title: string) => this.materialsFacade.addFolder(title))
      )
      .subscribe();
  }

  private subscribeToDeleteFolder() {
    this.materialStateService.deleteFolder$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(({ id, title }) => this.openDeleteDialog({ id, title }))
      )
      .subscribe();
  }

  private openDeleteDialog({ id, title }: Omit<Folder, 'created_at'>) {
    const dialogRef: MatDialogRef<DeleteFolderDialogComponent> = this.dialog.open(DeleteFolderDialogComponent, {
      data: { id, title },
    });
    dialogRef
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((id) => {
          if (id) {
            this.materialsFacade.deleteFolder(id);
          }
        })
      )
      .subscribe();
  }

  private subscribeToOpenFolder() {
    this.materialStateService.openFolder$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((id) => this.openFolder(id))
      )
      .subscribe();
  }

  public openFolder(id: number) {
    this.router.navigate([id], { relativeTo: this.activeRoute });
  }
}
