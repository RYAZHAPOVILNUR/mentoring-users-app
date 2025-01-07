import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import { FoldersFacade} from 'libs/users/materials/data-access/src/lib/folders-state/folders.facade';
import {
  CreateFolderDialogComponent
} from 'libs/users/materials/feature-folders-create/src/lib/create-folder-dialog/create-folder-dialog.component';

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
    const dialogRef = this.dialog.open(CreateFolderDialogComponent, {})
  }

  ini(){
    this.facade.init()
  }

}
