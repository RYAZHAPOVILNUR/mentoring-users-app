/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { IFolder, MaterialsFacade } from '@users/materials/data-access';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FolderContentComponent } from './folder-content/folder-content.component';
import { FolderDialogComponent } from './folder-dialog/folder-dialog.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'users-materials',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatButtonModule, 
    MatIconModule, 
    MatInputModule, 
    MatDialogModule,
    FolderDialogComponent,
    DeleteDialogComponent,
    FolderContentComponent
  ],
  templateUrl: './users-materials.component.html',
  styleUrls: ['./users-materials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMaterialsComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly router = inject(Router);

  readonly folders$ = this.materialsFacade.folders$;
  readonly status$ = this.materialsFacade.status$;
  readonly error$ = this.materialsFacade.error$;
  readonly selectedFolder$ = this.materialsFacade.selectedFolder$;

  ngOnInit() {
    this.materialsFacade.loadFolders();
  }

  openNewFolderDialog(): void {
    const dialogRef = this.dialog.open(FolderDialogComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe((result?: { title: string }) => {
        if (result) {
          this.materialsFacade.addFolder({ 
            name: result.title,
            title: result.title 
          });
        }
      });
  }

  onFolderDoubleClick(folder: IFolder): void {
    this.router.navigate(['/materials', folder.id]);
  }

  deleteFolder(folder: IFolder): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe((result: boolean) => {
        if (result && folder.id) {
          this.materialsFacade.deleteFolder(folder.id);
        }
      });
  }
}
