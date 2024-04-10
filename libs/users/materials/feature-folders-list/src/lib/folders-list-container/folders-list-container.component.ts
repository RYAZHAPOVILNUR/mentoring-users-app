import { LetDirective } from '@ngrx/component';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { FoldersListComponent } from '../folders-list/folders-list.component';
import { MaterialsFacade } from '@users/materials/data-access';
import { CreateFolderButtonComponent } from '@users/materials/ui';
import { CreateFolderDialogComponent } from '../create-folder-dialog/create-folder-dialog.component';
import { createFolderDialogConfig } from '../create-folder-dialog/create-folder-dialog.config';

@Component({
  selector: 'materials-folders-list-container',
  standalone: true,
  imports: [
    CommonModule,
    FoldersListComponent,
    MatProgressBarModule,
    LetDirective,
    MatDialogModule,
    CreateFolderButtonComponent,
    CreateFolderButtonComponent,
  ],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
})
export class FoldersListContainerComponent implements OnInit {
  private readonly materialsFacade = inject(MaterialsFacade);
  public readonly dialog = inject(MatDialog);

  public folders$ = this.materialsFacade.folders$;
  public isLoading$ = this.materialsFacade.isLoading$;

  ngOnInit(): void {
    this.materialsFacade.init();
  }

  public createFolderHandler(): void {
    const dialogRef = this.dialog.open(CreateFolderDialogComponent, createFolderDialogConfig);

    dialogRef.afterClosed().subscribe((folderTitle: string) => {
      if (folderTitle) {
        this.materialsFacade.createFolder(folderTitle);
      }
    });
  }
}
