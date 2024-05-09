import { Component, inject, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { Folder } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule
  ],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
})
export class MaterialsAddButtonComponent {
  @Input() folder!: Folder;
  public dialogAdd = inject(MatDialog)

  onAddMat(res: string){
    this.dialogAdd.open(MaterialsAddDialogComponent, {
      data: {
        name: res,
        folderId: this.folder.id
      }
    })
  }
}
