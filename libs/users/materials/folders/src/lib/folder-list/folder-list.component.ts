import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderCardComponent } from '../folder-card/folder-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IFolder, materialsFeature } from '@users/materials/data-access';
import { tap } from 'rxjs';
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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PushPipe } from '@ngrx/component';

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
    PushPipe,
  ],
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.scss'],
})
export class FeatureFolderListComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  public folders: IFolder[] = [];

  public folders$ = this.store.select(materialsFeature.selectFolders);
  public status$ = this.store.select(materialsFeature.selectStatus);
  public isLoading = true;

  public trackByFolderId(index: number, folder: IFolder): number {
    return folder.id;
  }
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private store: Store
  ) {}
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
}
