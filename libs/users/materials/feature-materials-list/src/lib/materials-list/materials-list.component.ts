import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Material } from '@users/materials/data-access';
import { MaterialsVM } from './materials-list.model';
import { MatButtonModule } from '@angular/material/button';
import { FoldersCardComponent } from '@users/materials/feature-folders-list';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsContentComponent } from '@users/materials/feature-materials-content';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, FoldersCardComponent, MaterialsCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent implements OnInit {
  @Input({ required: true }) vm!: MaterialsVM;
  @Output() deleteMaterial = new EventEmitter<Material>();
  @Output() goToFolders = new EventEmitter();
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit() {
    console.log(this.vm.folderMaterials);
  }

  public onGoToFolders(): void {
    this.goToFolders.emit();
  }

  public onDeleteMaterial(material: Material): void {
    this.deleteMaterial.emit(material);
  }

  public onOpenMaterial(material: Material): void {
    const dialogRef = this.dialog.open(MaterialsContentComponent, {
      data: material,
    });

    dialogRef.afterClosed().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
