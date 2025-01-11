import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import { FoldersFacade} from '@users/materials/data-access';
import {
  CreateFolderDialogComponent
} from '../create-folder-dialog/create-folder-dialog.component';

@Component({
  selector: 'users-create-folder-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './create-folder-button.component.html',
  styleUrls: ['./create-folder-button.component.scss'],
})
export class CreateFolderButtonComponent {
  private facade = inject(FoldersFacade)
  private readonly dialog: MatDialog = inject(MatDialog)

  openDialog(){
    const dialogRef = this.dialog.open(CreateFolderDialogComponent, {


    })
    dialogRef.afterClosed().subscribe(folder => {
      if (folder) {
        this.facade.addFolder(folder)
      }

    })
  }



}
