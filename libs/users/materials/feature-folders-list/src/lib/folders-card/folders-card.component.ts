import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FoldersVM } from '../../../../vm/folders-vm';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, DatePipe, MatButtonModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({ required: true })
  folder!: FoldersVM;

  @Output()
  deleteFolder = new EventEmitter();

  @Output()
  openFolder = new EventEmitter();

  public onDeleteFolder(event: Event): void {
    this.deleteFolder.emit();
  }

  public onOpenFolder(event: Event): void {
    this.openFolder.emit();
  }
}
