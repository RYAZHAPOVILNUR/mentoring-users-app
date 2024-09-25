import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-folders-list-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './folders-list-card.component.html',
  styleUrls: ['./folders-list-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListCardComponent {}
