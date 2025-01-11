import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import {
  CreateMaterialsDialogComponent
} from '../create-materials-dialog/create-materials-dialog.component';
import { MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-create-materials-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './create-materials-button.component.html',
  styleUrls: ['./create-materials-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMaterialsButtonComponent {
  @Input({required:true})
  folder_id!: number;
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly materialsFacade = inject(MaterialsFacade);
  openDialog(type: 'video'|'audio'|'default' |'pdf'): void {
    const dialogRef = this.dialog.open(CreateMaterialsDialogComponent, {
      data: { type, folder_id: this.folder_id }
    })
    dialogRef.afterClosed().subscribe(result => {this.materialsFacade.addMaterial({...result, folder_id: this.folder_id, type: type});});
  }



}
