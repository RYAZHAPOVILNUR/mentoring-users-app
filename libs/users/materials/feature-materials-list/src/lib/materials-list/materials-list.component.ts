import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Material } from '@users/materials/data-access';
import { MaterialsVM } from './materials-list.model';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FoldersCardComponent } from '@users/materials/feature-folders-list';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, FoldersCardComponent, MaterialsCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true }) vm!: MaterialsVM;
  @Output() deleteMaterial = new EventEmitter<Material>();
  @Output() goToFolders = new EventEmitter();
  private readonly router = inject(Router);

  public onGoToFolders(): void {
    this.goToFolders.emit();
  }

  public onDeleteMaterial(material: Material): void {
    this.deleteMaterial.emit(material);
  }

  public onOpenMaterial(id: number): void {}
}
