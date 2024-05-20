import { ChangeDetectionStrategy, Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { LetDirective } from '@ngrx/component';
import { UsersListComponent } from '@users/feature-users-list';
import { CreateUsersButtonComponent } from '@users/feature-users-create';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { Folder, FolderKeyEnum, FoldersFacade } from '@users/materials/data-access';
import { RenameDialogComponent } from '@users/core/ui';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { Event } from '@angular/router';


@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [
    CommonModule,
    FoldersListComponent,
    LetDirective,
    UsersListComponent,
    CreateUsersButtonComponent,
    FoldersAddButtonComponent
  ],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent implements OnInit {
  readonly facade = inject(FoldersFacade);
  private dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.facade.loadFolders();
  }


  onRenameFolder(folder:Folder) {
    this.dialog
      .open( RenameDialogComponent, {
        data: {
          renameTitle: FolderKeyEnum.FOLDERS,
          oldName: folder.title
        }
      })
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyRef),)

        tap((newName: string) =>
          this.facade.renameFolder(newName)
        )
  }

  onDeleteFolder($event: Event) {
console.log($event)
  }


}
