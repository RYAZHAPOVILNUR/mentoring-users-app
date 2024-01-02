import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderCardComponent } from '../folder-card/folder-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  IFolder,
  IFolderCreate,
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
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { FoldersActions } from '@users/materials/data-access';
import { LoadingStatus } from '@users/core/data-access';

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
  ],
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss'],
})
export class FeatureFolderListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  public folders: IFolder[] = [];

  public folders$ = this.store.select(materialsFeature.selectFolders);
  public status$ = this.store.select(materialsFeature.selectStatus);
  public isLoading = true;

  private refreshFoldersList() {
    this.folderService
      .getFolders()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.folders = data;
          this.isLoading = false;
          this.changeDetectorRef.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching folders:', error);
          this.isLoading = false;
        },
      });
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
    // this.store
    //   .select(materialsFeature.selectFolders)
    //   .pipe(
    //     tap((data) => {
    //       this.folders = data;
    //       console.log('folders', this.folders);

    //       this.status = 'loaded';
    //       console.log('status', this.status);
    //     }),
    //     catchError((error) => {
    //       console.error('Error fetching folders:', error);
    //       this.status = 'error';
    //       return EMPTY;
    //     }),
    //     takeUntil(this.destroy$)
    //   )
    //   .subscribe();

    // this.store.select(materialsFeature.selectFolders)

    // this.folderService
    //   .getFolders()
    //   .pipe(
    //     tap((data) => {
    //       this.folders = data;
    //       this.isLoading = false;
    //       this.changeDetectorRef.detectChanges();
    //     }),
    //     catchError((error) => {
    //       console.error('Error fetching folders:', error);
    //       this.isLoading = false;
    //       return EMPTY;
    //     }),
    //     takeUntil(this.destroy$)
    //   )
    //   .subscribe();
  }

  public openFolder(folderId: number) {
    this.router.navigate(['/materials-list'], { state: { data: folderId } });
    console.log(folderId);
  }

  public deleteFolder(event: Event, folderId: number) {
    event.stopPropagation();

    this.folderService
      .deleteFolder(folderId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          console.log('Folder deleted:', data);
          this.refreshFoldersList();
        },
        error: (error) => {
          console.error('Error deleting folder:', error);
        },
      });
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
        takeUntil(this.destroy$)
      )
      .subscribe();
  }
  //   dialogRef
  //     .afterClosed()
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe({
  //       next: (result) => {
  //         if (!result) {
  //           return;
  //         }

  //         if (result.id) {
  //           this.updateData(result);
  //         } else {
  //           this.postData(result);
  //         }
  //       },
  //       error: (err) => {
  //         console.error('Error after closing dialog:', err);
  //       },
  //     });
  // }

  postData(data: IFolderCreate) {
    this.isLoading = true;
    this.folderService
      .postFolder(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log(response);
          this.refreshFoldersList();
        },
        error: (error) => {
          console.error('Error posting folder:', error);
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }

  updateData(data: IFolder) {
    console.log('изменение папки в работе', data.title);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
