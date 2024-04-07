import { LetDirective } from '@ngrx/component';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { FoldersListComponent } from '../folders-list/folders-list.component';
import { MaterialsFacade } from '@users/materials/data-access';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateFolderButtonComponent, CreateFolderDialogComponent } from '@users/feature-folder-create';
import { createFolderDialogConfig } from '@users/feature-folder-create';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folders-list-container',
  standalone: true,
  imports: [
    CommonModule,
    FoldersListComponent,
    MatProgressBarModule,
    LetDirective,
    MatDialogModule,
    CreateFolderButtonComponent,
  ],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
})
export class FoldersListContainerComponent implements OnInit {
  private readonly materialsFacade = inject(MaterialsFacade);
  public dialog = inject(MatDialog);

  public folders$ = this.materialsFacade.folders$;
  public isLoading$ = this.materialsFacade.isLoading$;

  ngOnInit(): void {
    this.materialsFacade.init();
  }

  public onRemoveFolder(id: number): void {
    console.log(id);
    // this.materialsFacade.removeFolder(id);
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
