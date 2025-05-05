import { Component,ChangeDetectionStrategy,inject,DestroyRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {IAddFolder} from 'libs/users/materials/data-access/src/lib/models/folders/folders-add.model';
import {UsersFacade} from 'libs/users/materials/data-access/src/lib/+state/folders/folders.facade';
 
@Component({
  selector: 'folders-add-button', 
  templateUrl: './folders-add-button.component.html', 
  styleUrls: ['./folders-add-button.component.scss'] ,
  standalone:true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports:[
    MatIconModule, 
    MatButtonModule,
     MatDialogModule,
  ]

})
export class FoldersAddButtonComponent {
    public dialog = inject(MatDialog);
    private readonly destroyRef = inject(DestroyRef);
    private readonly foldersFacade = inject(UsersFacade);


    openAddFolderDialog(): void {
      const dialogRef: MatDialogRef<FoldersAddDialogComponent> = this.dialog.open(FoldersAddDialogComponent);

      dialogRef
        .afterClosed()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((result: IAddFolder) => {
          if (result && result.title) {
            const newFolder: IAddFolder = {
              title: result.title,
            };
            this.foldersFacade.addFolder(newFolder);
          }
        });
 
}

}