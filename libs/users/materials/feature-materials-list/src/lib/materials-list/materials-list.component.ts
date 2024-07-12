import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { Material, MaterialListVM } from '@users/materials/data-access';
import { MaterialsAddButtonComponent } from '@users/materials/feature-materials-create';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MaterialsContentComponent } from '@users/materials/feature-materials-content';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MaterialsCardComponent, MaterialsAddButtonComponent, MatIconModule, MatButtonModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  @Input({required: true})
  vm!: MaterialListVM;
  @Output() deleteMaterial = new EventEmitter<Material>();
  @Output() backToFolders = new EventEmitter<void>();

  public viewMaterial(material: Material) {
    const dialog = this.dialog.open(MaterialsContentComponent, {
      data: material,
    });

    dialog
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  public onDeleteMaterial(material: Material): void {
    this.deleteMaterial.emit(material);
  }

  public onBackToFolders() {
    this.backToFolders.emit();
  }
}
