import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-materials-list-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './materials-list-card.component.html',
  styleUrls: ['./materials-list-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListCardComponent {}
