import { Component, DestroyRef, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFabButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltip } from '@angular/material/tooltip';
import { filter } from 'rxjs';

import { MaterialsFacade } from '@users/materials/data-access-materials';

import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';

@Component({
  selector: 'users-materials-add-button',
  standalone: true,
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  imports: [MatFabButton, MatIcon, MatTooltip, MatMenuTrigger, MatMenu, MatMenuItem],
})
export class MaterialsAddButtonComponent {
  @Input() folderId!: number;
  private readonly dialog = inject(MatDialog);
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly destroyRef = inject(DestroyRef);

  openDialog(type: 'video' | 'pdf' | 'audio'): void {
    const dialogRef = this.dialog.open(MaterialsAddDialogComponent, {
      data: { type },
      width: '400px',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef), filter(Boolean))
      .subscribe((result) => {
        this.materialsFacade.addMaterial({
          ...result,
          folder_id: this.folderId,
        });
      });
  }
}
