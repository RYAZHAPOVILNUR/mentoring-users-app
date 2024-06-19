import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { Folder, MaterialsFacade } from '@users/materials/data-access';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AddFolderComponent } from '../add-folder/add-folder.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, MatProgressBarModule, AddFolderComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent implements OnInit{
  
  private readonly dialog = inject(MatDialog);
  private readonly facade = inject(MaterialsFacade);

  status = '';
  public readonly folders$ = this.facade.allFolders$;
  public readonly status$ = this.facade.status$;

  ngOnInit(): void {
    this.facade.initFolders()
    this.status$.subscribe(value => this.status = value)
  }

  public onDeleteFolder(folder: Folder): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.dialog.open(CoreUiConfirmDialogComponent, {
      data: { dialogText: `Вы уверены, что хотите удалить ${folder.title}` },
    });
    dialogRef.afterClosed().subscribe(
      (result: boolean) => {
        if (result) this.facade.deleteFolder(folder.id);
      })
  }
}
