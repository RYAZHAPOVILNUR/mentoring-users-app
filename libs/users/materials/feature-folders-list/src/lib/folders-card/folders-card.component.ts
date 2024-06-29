import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Folder } from '@users/users/materials/data-access';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PushPipe } from '@ngrx/component';
import { MatButtonModule } from '@angular/material/button';
import { MultiLangDatePipe } from '@users/shared/date';
import { TruncatePipe } from '@users/shared/text';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    PushPipe,
    MultiLangDatePipe,
    TruncatePipe,
    MatTooltipModule,
  ],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({required: true})
  folder!: Folder;

  @Output()
  deleteFolder = new EventEmitter();

  onDeleteFolder() {
    this.deleteFolder.emit();
  }
}
