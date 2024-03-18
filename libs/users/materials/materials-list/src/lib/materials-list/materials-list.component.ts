import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MaterialsListVM } from './materials-list-view-model';
import { MaterialsFacade } from '@users/materials/data-access';
import { Router } from '@angular/router';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RevealMaterialData } from '@users/materials/data-access';


@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MaterialsCardComponent, MatProgressBarModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true }) vm!: MaterialsListVM
  @Output() deleteMaterial = new EventEmitter<number>();
  @Output() revealMaterial = new EventEmitter<RevealMaterialData>();

  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly router = inject(Router);
  navigateToMatList(): void {
    this.router.navigate(['/materials'])
  }

   onDeleteMaterial(id: number): void {
    this.deleteMaterial.emit(id)
  }

  onRevealMaterial(data: RevealMaterialData) {
    this.revealMaterial.emit(data);
  }
}
