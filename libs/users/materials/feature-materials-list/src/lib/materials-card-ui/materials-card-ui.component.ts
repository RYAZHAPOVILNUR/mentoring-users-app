import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Material, MaterialsState } from '@users/materials/data-access';
import { SetIconPipe } from '../../../../../../core/pipes/set-icon.pipe';

@Component({
  selector: 'users-materials-card-ui',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    SetIconPipe
  ],
  templateUrl: './materials-card-ui.component.html',
  styleUrls: ['./materials-card-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsCardUiComponent {
  @Input({ required: true }) material!: Material;
  private readonly materialsState = inject(MaterialsState);

  onCardClick() {
    this.materialsState.openMaterial(this.material.id);
  }

  onDeleteButtonClick() {
    this.materialsState.deleteMaterial(this.material.id);
  }
}
