import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MaterialEntity, MaterialsFacade } from '@users/materials/data-access';
import { MaterialIconPipe } from '../../pipes/material-icon.pipe';

@Component({
  selector: 'users-materials-card-ui',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MaterialIconPipe,
    DatePipe
  ],
  templateUrl: './materials-card-ui.component.html',
  styleUrls: ['./materials-card-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsCardUiComponent {
  @Input({ required: true }) material!: MaterialEntity;
  private readonly materialsFacade = inject(MaterialsFacade);

  onCardClick() {
    this.materialsFacade.emitOpenMaterial(this.material);
  }

  onDeleteButtonClick() {
    this.materialsFacade.emitDeleteMaterial(this.material.id);
  }
}
