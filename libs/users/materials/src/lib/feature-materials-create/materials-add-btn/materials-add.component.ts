import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MaterialPostRequest } from '../../../../data-access/src/lib/folders-materials-types/folders-materials-types';
import { first, tap } from 'rxjs';

@Component({
  selector: 'materials-add-btn',
  templateUrl: './materials-add.component.html',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatMenuModule],
})
export class MaterialsAddComponent {
  private dialog = inject(MatDialog);
  @Output() createNewMaterial = new EventEmitter<MaterialPostRequest>();

  openDialog(typeMaterial: string): void {
    const dialogRef = this.dialog.open(MaterialsAddDialogComponent, {
      width: '250px',
      data: {
        typeMaterial,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(
        first(),
        tap((res: MaterialPostRequest) => {
          if (res) this.createNewMaterial.emit(res);
        })
      )
      .subscribe();
  }
}
