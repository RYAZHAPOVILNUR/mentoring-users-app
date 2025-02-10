import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-folders-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './folders-cards.component.html',
  styleUrls: ['./folders-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardsComponent {}
