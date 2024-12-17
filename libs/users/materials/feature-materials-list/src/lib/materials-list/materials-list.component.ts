import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MaterialsListVM } from './materials-list-view-model';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { IMaterial } from '@users/materials/data-access';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsContentComponent } from '@users/materials/feature-materials-content';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, NgIf, MatProgressBarModule, NgFor, MaterialsCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  @Input({ required: true }) vm!: MaterialsListVM;
  @Output() deleteMaterial = new EventEmitter();

  public onDeleteMaterial(material: IMaterial) {
    this.deleteMaterial.emit(material);
  }

  public openMaterial(material: IMaterial): void {
    const dialogRef = this.dialog.open(MaterialsContentComponent, {
      data: { material },
    });

    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
