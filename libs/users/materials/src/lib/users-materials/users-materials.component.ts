import { MaterialsFacade } from './../../../data-access/src/lib/+state/materials.facade';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { MaterialFolderAddBtnComponent } from '../../../feature-materials-folder/src/lib/material-folder-add-btn/material-folder-add-btn.component';
import { MaterialFolderItemComponent } from '../../../feature-materials-folder/src/lib/material-folder-item/material-folder-item.component'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs/operators';
import { IFolder } from 'libs/users/materials/data-access/src/lib/model/folders-models';
import { CoreUiConfirmDialogComponent } from '@users/core/ui';

@Component({
  selector: 'users-users-materials',
  standalone: true,
  imports: [CommonModule, MaterialFolderAddBtnComponent, MaterialFolderItemComponent, PushPipe],
  templateUrl: './users-materials.component.html',
  styleUrls: ['./users-materials.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMaterialsComponent implements OnInit {
  private matDialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef)

  private readonly facade = inject(MaterialsFacade)
  public readonly folders$ = this.facade.folders$

  public deleteFolder(folder: IFolder): void {
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
