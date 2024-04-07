import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { take, tap } from 'rxjs';
import { FolderAdd, MaterialFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    FoldersAddDialogComponent
  ],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
})
export class FoldersAddButtonComponent {
  private readonly matDialog = inject(MatDialog);
  private readonly MaterialFacade = inject(MaterialFacade)

  openDialog(){
    const dialogRef = this.matDialog.open(FoldersAddDialogComponent);
    dialogRef.afterClosed().pipe(
      tap((folder: FolderAdd) => {
        if(folder){
          this.MaterialFacade.createFolder(folder)
        }
      }),
      take(1),
    ).subscribe()
  }
}
