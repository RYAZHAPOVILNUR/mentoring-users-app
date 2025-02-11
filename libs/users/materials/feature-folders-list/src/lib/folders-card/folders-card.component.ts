import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FoldersVM } from '../../../../folders-vm';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({ required: true })
  folder!: FoldersVM;

  @Output()
  delete = new EventEmitter<number>();
  @Output()
  openFolder = new EventEmitter<number>();

  public showDeleteIcon = false;

  public deleteFolder(event: Event): void {
    event.stopPropagation();
    this.delete.emit()
  }

  onOpenFolder(): void {
    this.openFolder.emit(this.folder.id);
  }
}
