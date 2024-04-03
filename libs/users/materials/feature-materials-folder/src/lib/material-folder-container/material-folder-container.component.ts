import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';
import { MaterialsFacade } from '@users/materials/data-access';
import { tap } from 'rxjs';
import { PushPipe } from '@ngrx/component';
import { MaterialFolderAddBtnComponent } from '../material-folder-add-btn/material-folder-add-btn.component';
import { MaterialFolderItemComponent } from '../material-folder-item/material-folder-item.component';
import { FolderEntity } from 'libs/users/materials/data-access/src/lib/model/material.entity';

@Component({
  selector: 'users-material-folder-container',
  standalone: true,
  imports: [CommonModule, MaterialFolderAddBtnComponent, MaterialFolderItemComponent, PushPipe],
  templateUrl: './material-folder-container.component.html',
  styleUrls: ['./material-folder-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialFolderContainerComponent implements OnInit{
  private matDialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef)

  private readonly facade = inject(MaterialsFacade)
  public readonly folders$ = this.facade.folders$


  public openFolder(id: number) {
    this.facade.loadMaterials(id)
  }


  public deleteFolder(folder: FolderEntity): void {
    const dialogRef: MatDialogRef<CoreUiConfirmDialogComponent> = this.matDialog.open(
      CoreUiConfirmDialogComponent,
      { data: { dialogText: `Вы уверены, что хотите удалить ${folder.title}` } }
    )

    dialogRef.afterClosed()
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((result: boolean) => {
        if(result) this.facade.deleteFolder(folder.id)
      })
    )
    .subscribe();
  }
  ngOnInit(): void {
    this.facade.loadFolders()
  }
}
