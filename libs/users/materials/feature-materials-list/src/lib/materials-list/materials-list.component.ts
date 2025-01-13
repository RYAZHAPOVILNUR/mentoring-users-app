import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialsEntity} from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';
import {MaterialsFacade} from '@users/materials/data-access';
import { MatDialog } from '@angular/material/dialog';
import {
  MaterialsDeleteDialogComponent
} from 'libs/users/materials/feature-materials-list/src/lib/materials-delete-dialog/materials-delete-dialog.component';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true }) material$: MaterialsEntity | undefined;
  private readonly materialsFacade = inject(MaterialsFacade)
  private dialog: MatDialog = inject(MatDialog)
  openDialog(id: number) {
    const dialogRef = this.dialog.open(MaterialsDeleteDialogComponent)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.materialsFacade.deleteMaterial(id)
      }
    })
  }
  deleteMaterial(id: number | undefined, event: MouseEvent) {
    event.stopPropagation();
    if(id){this.openDialog(id)}

  }
}
