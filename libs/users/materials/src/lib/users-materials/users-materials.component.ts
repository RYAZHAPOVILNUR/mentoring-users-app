/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MaterialsFacade } from '@users/materials/data-access';
import { FolderDialogComponent } from './folder-dialog/folder-dialog.component';
import { IFolder } from '@users/materials/data-access';
import { tap } from 'rxjs/operators';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FolderContentComponent } from './folder-content/folder-content.component';

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

  readonly folders$ = this.materialsFacade.folders$;
  readonly status$ = this.materialsFacade.status$;
  readonly error$ = this.materialsFacade.error$;
  selectedFolder: IFolder | null = null;

  ngOnInit() {
    this.materialsFacade.loadFolders();
  }

  openNewFolderDialog(): void {
    const dialogRef = this.dialog.open(FolderDialogComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result?: { title: string }) => {
      if (result) {
        console.log('Creating folder:', result);
        this.materialsFacade.addFolder({ 
          name: result.title,
          title: result.title 
        });
      }
    });
  }

  onFolderDoubleClick(folder: IFolder): void {
    console.log('Opening folder:', folder);
    this.selectedFolder = folder;
  }

  deleteFolder(folder: IFolder): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result && folder.id) {
        console.log('Deleting folder:', folder);
        this.materialsFacade.deleteFolder(folder.id);
      }
    });
  }
}
