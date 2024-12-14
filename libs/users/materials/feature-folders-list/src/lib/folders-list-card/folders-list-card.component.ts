import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Folder } from '@users/materials/data-access';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-folders-list-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatButtonModule],
  templateUrl: './folders-list-card.component.html',
  styleUrls: ['./folders-list-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListCardComponent {
  @Input({required: true})
  folder!: Folder;

  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter();

  onDeleteFolder(event: Event) {
    this.deleteFolder.emit();
  }

  public onOpenFolder(event: Event) {
    this.openFolder.emit(this.folder.id)
  }
}
