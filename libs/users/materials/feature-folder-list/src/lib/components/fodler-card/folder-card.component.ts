import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Folder } from 'libs/users/materials/data-access/src/lib/models/folder.interface';
import { FormatDate } from '../../pipes/format-date.pipe';
import { DeleteFolderVisibilityDirective } from '../../directives/delete-folder-visibility.directive';

@Component({
  standalone: true,
  selector: 'users-folder-card',
  templateUrl: './folder-card.component.html',
  styleUrls: ['./folder-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    FormatDate,
    MatButtonModule,
    DeleteFolderVisibilityDirective,
  ],
  providers: [DatePipe],
})
export class FolderCardComponent {
  @Input({ required: true }) public folder!: Folder;

  @Output() public readonly deleteFolder = new EventEmitter<number>();

  onDeleteFolder(id: number) {
    this.deleteFolder.emit(id);
  }
}
