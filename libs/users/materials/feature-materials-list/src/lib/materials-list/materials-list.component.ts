import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialType } from '@users/materials/data-access';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MaterialsContentComponent } from '@users/materials/feature-materials-content';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialListVM } from './materials-list.view-model';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsCardComponent,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MaterialsContentComponent,
  ],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true }) vm!: MaterialListVM;
  @Output() backToFolders = new EventEmitter();
  @Output() deleteMaterial = new EventEmitter();
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  public onBackToFolders(): void {
    this.backToFolders.emit();
  }

  public onDeleteMaterial(material: MaterialType): void {
    this.deleteMaterial.emit(material);
  }

  public onOpenMaterial(material: MaterialType): void {
    const dialogRef = this.dialog.open(MaterialsContentComponent, {
      data: material,
    });

    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
