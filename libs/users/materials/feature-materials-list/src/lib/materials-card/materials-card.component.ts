import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsEntity } from '@users/users/materials/data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PushPipe } from '@ngrx/component';
import { MaterialIconPipe } from './material-icon.pipe';
import { MultiLangDatePipe } from '@users/shared/date';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TruncatePipe } from '@users/shared/text';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    PushPipe,
    MaterialIconPipe,
    MultiLangDatePipe,
    TruncatePipe,
    MatTooltipModule,
  ],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {
  @Input({required: true})
  material!: MaterialsEntity;

  @Output()
  deleteMaterial = new EventEmitter();

  onDeleteMaterial(event: Event) {
    event.stopPropagation();
    this.deleteMaterial.emit();
  }
}
