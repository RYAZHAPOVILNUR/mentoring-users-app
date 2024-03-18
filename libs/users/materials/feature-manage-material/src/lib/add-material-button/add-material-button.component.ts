import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddMaterialDialogComponent } from '../add-material-dialog/add-material-dialog.component';
import { take, tap } from 'rxjs';
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
  public readonly materialTypes = ['Видео', 'Файл PDF', 'Подкаст'];
  private readonly dialog: MatDialog = inject(MatDialog);
  private readonly materialStateService: MaterialStateService = inject(MaterialStateService);

  public openDialog(materialType: string) {
    const dialogRef: MatDialogRef<AddMaterialDialogComponent> = this.dialog.open(AddMaterialDialogComponent, {
      data: materialType,
    });

    dialogRef
      .afterClosed()
      .pipe(
        take(1),
        tap((material) => {
          if (material) {
            this.materialStateService.updateAddMaterial(material);
          }
        })
      )
      .subscribe();
  }
}
