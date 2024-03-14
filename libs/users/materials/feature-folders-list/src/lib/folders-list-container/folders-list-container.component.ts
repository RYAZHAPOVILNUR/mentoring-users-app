import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsFacade } from '@users/materials-data-access';
import { LetDirective } from '@ngrx/component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { AddFolderButtonComponent, DeleteFolderDialogComponent } from '@users/feature-manage-folder';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialEventService } from '../../../../services/material-event-service';

@Component({
  selector: 'folders-list-container',
  standalone: true,
  imports: [CommonModule, LetDirective, MatProgressBarModule, FoldersListComponent, AddFolderButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent implements OnInit {
  private readonly materialsFacade = inject(MaterialsFacade);
  public folders$ = this.materialsFacade.folders$;
  public loadingStatus$ = this.materialsFacade.loadingStatus$;
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private materialEventService: MaterialEventService<{ id: number; title: string }> = inject(MaterialEventService);

  // public loadingStatus$ = 'error';

  ngOnInit(): void {
    this.materialsFacade.loadFolders();
    this.subscribeToDeleteFolder();
  }

  public createFolder(title: string) {
    this.materialsFacade.addFolder(title);
  }

  private subscribeToDeleteFolder() {
    this.materialEventService
      .getAction$()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(({ id, title }) => this.openDeleteDialog({ id, title }))
      )
      .subscribe();
  }

  private openDeleteDialog({ id, title }: { id: number; title: string }) {
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

  public openFolder(id: number) {
    this.router.navigate([id], { relativeTo: this.activeRoute });
  }
}
