import { MaterialsFacade } from './../../../data-access/src/lib/+state/materials.facade';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PushPipe } from '@ngrx/component';
import { MaterialFolderAddBtnComponent } from '../../../feature-materials-folder/src/lib/material-folder-add-btn/material-folder-add-btn.component';
import { MaterialFolderItemComponent } from '../../../feature-materials-folder/src/lib/material-folder-item/material-folder-item.component'
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialFolderDialogComponent } from 'libs/users/materials/feature-materials-folder/src/lib/material-folder-dialog/material-folder-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

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


  // public openAddNewTaskModal(columnIndex: number): void {
  //   const dialogRef: MatDialogRef<MaterialFolderDialogComponent> = this.matDialog.open(MaterialFolderDialogComponent, {});
  //   dialogRef.afterClosed()
  //     .pipe(
  //       takeUntilDestroyed(this.destroyRef),
  //       filter(folderName => !!folderName)
  //     )
  //     .subscribe((folderName: string) => this.addTask.emit({ folderName }))
  // }

  ngOnInit(): void {
    this.facade.loadFolders()
  }


}
