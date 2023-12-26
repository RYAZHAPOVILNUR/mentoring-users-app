import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderCardComponent } from '../folder-card/folder-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  IFolder,
  IFolderTitle,
} from '../../../../data-access/src/lib/models/ifolder';
import { FolderService } from '../../../../data-access/src/lib/services/folder-service/folder-service.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';

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
  templateUrl: './feature-folder-list.component.html',
  styleUrls: ['./feature-folder-list.component.scss'],
})
export class FeatureFolderListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  public folders: IFolder[] | null = null;
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
  constructor(
    private folderService: FolderService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    console.log('storage in parent', sessionStorage.getItem('folderId'));
  }

  ngOnInit(): void {
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
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    dialogConfig.data = { folder };
    console.log(folder?.title);

    const dialogRef = this.dialog.open(FolderCardComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (result) => {
          if (!result) {
            return;
          }

          if (result.id) {
            this.updateData(result);
          } else {
            this.postData(result);
          }
        },
        error: (err) => {
          console.error('Error after closing dialog:', err);
        },
      });
  }

  postData(data: IFolderTitle) {
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
