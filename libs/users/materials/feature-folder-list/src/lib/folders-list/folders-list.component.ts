import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FoldersEntity} from '@users/materials/data-access'
import {FoldersFacade} from '@users/materials/data-access';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import {
  FoldersDeleteDialogComponent
} from '../folders-delete-dialog/folders-delete-dialog.component';

@Component({
  selector: 'users-folders-state-list',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true }) folder!: FoldersEntity;

  private readonly foldersFacade: FoldersFacade = inject(FoldersFacade);
  private readonly router = inject(Router);
  private readonly dialog: MatDialog = inject(MatDialog);

  openDialog(id:number){
    const dialogRef = this.dialog.open(FoldersDeleteDialogComponent)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.foldersFacade.deleteFolder(id)
      }
    })

  }

  deleteFolder(id: number, event: MouseEvent) {
    event.stopPropagation();
    this.openDialog(id)
    // this.foldersFacade.deleteFolder(id);
  }
  openFolder() {
    this.router.navigate(['materials', this.folder.id]);
  }

  protected readonly Date = Date;
}
