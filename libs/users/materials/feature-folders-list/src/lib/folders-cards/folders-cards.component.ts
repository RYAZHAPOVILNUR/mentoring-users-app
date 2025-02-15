import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderInterface, FoldersFacade } from '@users/materials/data-access';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-folders-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './folders-cards.component.html',
  styleUrls: ['./folders-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersCardsComponent {
  @Input() folder!: FolderInterface;

  foldersFacade = inject(FoldersFacade);

  showDelete = false;

  onDelete(folderId: number) {
    this.foldersFacade.deleteFolder(folderId);
  }
}
