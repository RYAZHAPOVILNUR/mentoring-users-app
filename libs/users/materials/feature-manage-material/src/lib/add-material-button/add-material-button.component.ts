import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddMaterialDialogComponent } from '../add-material-dialog/add-material-dialog.component';
import { first, tap } from 'rxjs';
import { MaterialStateService } from '../../../../services/material-state.service';

@Component({
  selector: 'users-add-material-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTooltipModule, MatIconModule, MatMenuModule],
  templateUrl: './add-material-button.component.html',
  styleUrls: ['./add-material-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMaterialButtonComponent {
  private readonly _dialog: MatDialog = inject(MatDialog);
  private readonly _materialStateService: MaterialStateService = inject(MaterialStateService);
  public readonly materialTypes = ['Видео', 'Файл PDF', 'Подкаст'];

  public openDialog(materialType: string) {
    const dialogRef: MatDialogRef<AddMaterialDialogComponent> = this._dialog.open(AddMaterialDialogComponent, {
      data: materialType,
    });

    dialogRef
      .afterClosed()
      .pipe(
        first(),
        tap((material) => {
          if (material) {
            this._materialStateService.updateAddMaterial(material);
          }
        })
      )
      .subscribe();
  }
}
