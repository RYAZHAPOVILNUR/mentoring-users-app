import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsFacade } from '@users/materials-data-access';
import { LetDirective } from '@ngrx/component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { AddFolderButtonComponent, DeleteFolderDialogComponent } from '@users/feature-manage-folder';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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

  // public loadingStatus$ = 'error';

  ngOnInit(): void {
    this.materialsFacade.loadFolders();
  }

  public createFolder(title: string) {
    this.materialsFacade.addFolder(title);
  }

  public deleteFolder({ id, title }: { id: number; title: string }) {
    const dialogRef: MatDialogRef<DeleteFolderDialogComponent> = this.dialog.open(DeleteFolderDialogComponent, {
      data: { id, title },
    });
    console.log(dialogRef.componentInstance.dialogData);
  }
}
