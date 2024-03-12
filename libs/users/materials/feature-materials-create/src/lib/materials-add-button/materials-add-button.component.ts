import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsAddDialogComponent } from '../materials-add-dialog/materials-add-dialog.component';
import { MatMenuTrigger, MatMenuModule, MatMenuItem } from '@angular/material/menu';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { createdMaterial } from '@users/materials/data-access'
@Component({
  selector: 'materials-add-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule
  ],
  templateUrl: './materials-add-button.component.html',
  styleUrls: ['./materials-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsAddButtonComponent {
  private dialog = inject(MatDialog)
  private destroyRef = inject(DestroyRef)
  @Output()
  createMaterial = new EventEmitter<Omit<createdMaterial, "folder_id">>()
  public openDialog(event: MouseEvent) {
    const clickedButton = <HTMLButtonElement>event.target;
    const dialogRef = this.dialog.open(MaterialsAddDialogComponent);
    dialogRef.componentInstance.material = clickedButton.innerText;
    dialogRef.afterClosed().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(createdUser => {
      if (createdUser) {
        this.createMaterial.emit(createdUser)
      }
    })
  }
}
