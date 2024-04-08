import { LetDirective } from '@ngrx/component';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { FoldersListComponent } from '../folders-list/folders-list.component';
import { MaterialsFacade } from '@users/materials/data-access';
import {
  CreateFolderButtonComponent,
  CreateFolderDialogComponent,
  createFolderDialogConfig,
} from '@users/materials/feature-folder-create';

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
  private readonly destroyRef = inject(DestroyRef);
  public readonly dialog = inject(MatDialog);

  public folders$ = this.materialsFacade.folders$;
  public isLoading$ = this.materialsFacade.isLoading$;

  ngOnInit(): void {
    this.materialsFacade.init();
  }

  public createFolderHandler(): void {
    const dialogRef = this.dialog.open(CreateFolderDialogComponent, createFolderDialogConfig);

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((folderTitle: string) => {
        if (folderTitle) {
          this.materialsFacade.createFolder(folderTitle);
        }
      });
  }
}
