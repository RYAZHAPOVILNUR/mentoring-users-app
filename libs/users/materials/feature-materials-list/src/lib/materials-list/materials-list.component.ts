import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { OpenMaterialData } from '@users/materials/data-access';
import { Router } from '@angular/router';
import { MaterialsListViewModel } from './materials-list-view-model.type';
@Component({
  selector: 'users-feature-materials-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MaterialsCardComponent,
  ],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true }) viewModel!: MaterialsListViewModel;
  @Output() deleteMaterial = new EventEmitter<number>();
  @Output() openMaterial = new EventEmitter<OpenMaterialData>();


  private readonly router = inject(Router);

  navigateToMaterialList(): void {
    this.router.navigate(['/materials'])
  }

  onDeleteMaterial(id: number): void {
    this.deleteMaterial.emit(id)
  }

  onOpenMaterial(data: OpenMaterialData): void {
    this.openMaterial.emit(data)
  }
}
