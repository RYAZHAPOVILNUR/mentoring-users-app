import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderInterface } from '@users/materials/data-access';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'users-folders-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './folders-cards.component.html',
  styleUrls: ['./folders-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardsComponent {
  @Input() folder!: FolderInterface
}
