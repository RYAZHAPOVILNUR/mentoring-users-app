import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FileType } from '@users/settings/data-access';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsAddDialogComponent,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatTooltipModule
  ],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
})
export class MaterialsAddButtonComponent {
  folderId = 0
  FileType = FileType
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {
    this.folderId = this.activatedRoute.snapshot.params["id"]
  }

  openDialog(id: number, fileType: FileType) {
    this.dialog.open(MaterialsAddDialogComponent,
      {
        data:
        {
          folderId: id,
          dataType: fileType
        }
      });
  }
}
