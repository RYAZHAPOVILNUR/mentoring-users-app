import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Folder } from 'libs/users/materials/data-access/src/lib/model/folder.model';
import { MatCardModule } from "@angular/material/card";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import { MaterialsFolderCreateComponent } from '../materials-folder-create/materials-folder-create.component';


@Component({
  selector: 'users-materials-view',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatGridListModule,MatButtonModule,MatIconModule],
  templateUrl: './materials-view.component.html',
  styleUrls: ['./materials-view.component.scss'],
})
export class MaterialsViewComponent  {
  private matDialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef)
  @Input({required:true}) folders!:Folder[];
  
  public openAddNewFolderModal():void{
    const dialogRef: MatDialogRef<MaterialsFolderCreateComponent> = this.matDialog.open(MaterialsFolderCreateComponent, {});
    
  }

}
