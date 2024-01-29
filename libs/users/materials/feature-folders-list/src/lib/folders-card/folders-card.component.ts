import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IFolder } from '../../../../data-access/src/lib/models/folder.interface';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, TranslateModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersCardComponent {
  public readonly router = inject(Router);
  @Input({ required: true }) folder!: IFolder;
  @Output() deleteFolderEvent = new EventEmitter();
  @Output() openFolderEvent = new EventEmitter();

  onOpenFolder() {
    this.openFolderEvent.emit()
  }

  onDeleteFolder() {
    this.deleteFolderEvent.emit();
  }
}
