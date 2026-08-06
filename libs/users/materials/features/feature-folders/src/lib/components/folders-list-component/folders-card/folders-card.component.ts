import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

import { TemplateHoverDirective } from '@users/shared';
import { DeleteButtonComponent } from '@users/shared-features';
import { Folder } from '@users/ui-folders';

@Component({
  selector: 'users-folders-card',
  imports: [
    CommonModule,
    MatCard,
    MatIconModule,
    MatCardContent,
    MatFormFieldModule,
    TemplateHoverDirective,
    MatTooltip,
    DeleteButtonComponent,
    MatCardHeader,
    DeleteButtonComponent,
  ],
  templateUrl: './folders-card.component.html',
  styleUrl: './folders-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input() folder!: Folder;
  @ViewChild('folderCard', { static: true, read: ElementRef }) hoverTarget!: ElementRef;
  @Output() deleteButtonClick = new EventEmitter<void>();

  onDeleteButtonClick(event: MouseEvent): void {
    event.stopPropagation();
    this.deleteButtonClick.emit();
  }
}
