import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from "../folders-list/folders-list.component";
import { Folder, MaterialsFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { Router } from '@angular/router';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, LetDirective,],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent implements OnInit{
  private router = inject(Router)
  private materialsFacade = inject(MaterialsFacade);
  public folders$ = this.materialsFacade.folders$;
  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.materialsFacade.loadFolders()
  }

  openFolder(id: number) {
    this.router.navigate([`/materials/${id}`])
  }

  folderDeleted(folder: Folder) {
    const dialogRef = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: {dialogText: `Вы уверены, что хотите удалить ${folder.title}`},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.materialsFacade.folderDeleted(folder.id)
      }
    });
  }
}
