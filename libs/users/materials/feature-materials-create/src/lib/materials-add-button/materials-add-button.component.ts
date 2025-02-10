import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MenuPositionY } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { tap } from 'rxjs';

interface IMaterialFromAddMaterialDialog {
  title: string;
  material_link: string;
}

@Component({
  selector: 'materials-add-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  private dialog = inject(MatDialog);

  @Input()
  yPosition?: MenuPositionY;

  @Output() sendNewMaterial = new EventEmitter();

  public openAddMaterialDialog(fileType: string): void {
    const dialogRef: MatDialogRef<MaterialsAddDialogComponent> = this.dialog.open(MaterialsAddDialogComponent, {
      data: { fileType: fileType },
      width: '400px',
    });
    dialogRef
      .afterClosed()
      .pipe(
        tap((material: IMaterialFromAddMaterialDialog) => {
          this.sendNewMaterial.emit(material);
        })
      )
      .subscribe();
  }
}
