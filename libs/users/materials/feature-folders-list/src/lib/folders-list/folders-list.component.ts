import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardsComponent } from '../folders-cards/folders-cards.component';

@Component({
  selector: 'materials-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardsComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {}
