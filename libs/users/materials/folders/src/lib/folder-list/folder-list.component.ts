import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  inject,
  DestroyRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderCardComponent } from '../folder-card/folder-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  IFolder,
  IFolderCreate,
  IFolderId,
  materialsFeature,
} from '@users/materials/data-access';
import { FolderService } from '@users/materials/data-access';
import { Subject, takeUntil, tap, catchError, EMPTY } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { FoldersActions } from '@users/materials/data-access';
import { LoadingStatus } from '@users/core/data-access';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-feature-folder-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule,
    MatDialogModule,
    MatMenuModule,
    MatProgressBarModule,
  ],
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss'],
})
export class FeatureFolderListComponent implements OnInit, OnDestroy {
  destroyRef = inject(DestroyRef);
  private destroy$ = new Subject();
  public folders: IFolder[] = [];

  public folders$ = this.store.select(materialsFeature.selectFolders);
  public status$ = this.store.select(materialsFeature.selectStatus);
  public isLoading = true;

  private refreshFoldersList() {
    this.store.dispatch(FoldersActions.loadFolders());
  }

  public trackByFolderId(index: number, folder: IFolder): number {
    return folder.id;
  }
  constructor(
    private folderService: FolderService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private store: Store
  ) {
    console.log('storage in parent', sessionStorage.getItem('folderId'));
  }

  ngOnInit(): void {
    this.store.dispatch(FoldersActions.loadFolders());
  }

  public openFolder(folderId: number) {
    this.router.navigate(['/materials-list'], { state: { data: folderId } });
    console.log(folderId);
  }

  public deleteFolder(event: Event, folderId: number) {
    event.stopPropagation();
    this.store.dispatch(FoldersActions.deleteFolder({ id: folderId }));
    // this.folderService
    //   .deleteFolder(folderId)
    //   .pipe(
    //     tap((data) => {
    //       this.refreshFoldersList();
    //       console.log('Folder deleted:', data);
    //     }),
    //     catchError((error) => {
    //       console.error('Error deleting folder:', error);
    //       return EMPTY;
    //     }),
    //     takeUntilDestroyed(this.destroyRef)
    //   )
    //   .subscribe();
  }

  public openDialog(folder?: IFolder): void {
    const folderTitles = this.folders?.map((f) => f.title);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.data = { folder, folderTitles };
    console.log(folder?.title);

    const dialogRef = this.dialog.open(FolderCardComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .pipe(
        tap((result) => {
          if (!result) {
            return;
          }
          if (result.id) {
            this.updateData(result);
          } else {
            this.postData(result);
          }
        }),
        tap({
          error: (err) => {
            console.error('Error after closing dialog:', err);
          },
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  postData(folder: IFolder) {
    this.store.dispatch(FoldersActions.createFolder({ folder }));
  }

  updateData(data: IFolder) {
    console.log('изменение папки в работе', data.title);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
