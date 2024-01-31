import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FoldersAddDialogComponent } from '../folders-add-dialog/folders-add-dialog.component';
import { CreateFolderDTO, FolderEntity, MaterialsFacade } from '../../data-access/src';

@Component({
  selector: 'users-folders-add-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './folders-add-button.component.html',
  styleUrls: ['./folders-add-button.component.scss'],
})
export class FoldersAddButtonComponent {
  matDialog = inject(MatDialog);
  matDialogFolderAdd:  MatDialogRef<FoldersAddDialogComponent, any> | undefined;
  materialsFacade = inject(MaterialsFacade);

  openAddFolderDialog(){
    this.matDialogFolderAdd = this.matDialog.open(FoldersAddDialogComponent,{
      width: '350px'
    });
    this.matDialogFolderAdd.afterClosed().pipe().subscribe((newFolder)=>{
      if(newFolder)
        this.addFolder(newFolder)
    })
  }
  addFolder(newFolder: CreateFolderDTO){
    this.materialsFacade.addFolder(newFolder);
  }
}
