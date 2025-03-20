import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import {  IFolder } from '@users/materials/data-access';
import { BasketDirective } from './directives-folders/basket.directive';
import { HighlightOnClickDirective } from './directives-folders/highlight-on-click.directive.ts';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    BasketDirective,
    HighlightOnClickDirective,
  ],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
})
export class FoldersCardComponent {
  @Input({ required: true })
  folder!: IFolder;

  @Output() deleteFolder = new EventEmitter<void>();
  @Output() openFolder = new EventEmitter<number>();

  onDeleteFolder(event: Event): void {
    event.stopPropagation();
    this.deleteFolder.emit();
  }

  onOpenFolder(event: Event): void {
    if (!(event.target as HTMLElement).closest('.button-folders-card')) {
      this.openFolder.emit(this.folder.id);
    }
  }
}
