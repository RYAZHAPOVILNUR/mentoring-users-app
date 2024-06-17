import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { GetIconPipe, MaterialDTO, MaterialsFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-card-ui',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    GetIconPipe
  ],
  templateUrl: './materials-card-ui.component.html',
  styleUrls: ['./materials-card-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsCardUiComponent {
  @Input({ required: true }) material!: MaterialDTO;
  private readonly materialsFacade = inject(MaterialsFacade);

  onCardClick() {
    this.materialsFacade.openMaterial(this.material.id);
  }

  onDeleteButtonClick() {
    this.materialsFacade.deleteMaterial(this.material.id);
  }
}
