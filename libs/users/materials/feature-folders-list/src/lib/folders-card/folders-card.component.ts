import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Folder, FoldersFacade } from '@users/materials/data-access';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  private readonly foldersFacade = inject(FoldersFacade);
  @Output() deleteFolder = new EventEmitter();
  @Input({ required: true })
  folder!: Folder;

  public onDeleteFolder() {
    this.deleteFolder.emit(this.folder);
  }

  public dateFormat(time: number): string {
    const date = new Date(time);
    const formattedDate = `${date.getDate()}
    ${date.toLocaleString('default', { month: 'short' }).slice(0, -1)}
    ${date.getFullYear()}`;
    return formattedDate;
  }
}
