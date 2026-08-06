import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

import { TemplateHoverDirective } from '@users/shared';
import { DeleteButtonComponent } from '@users/shared-features';
import { Material } from '@users/ui-materials';

import { MaterialIconPipe } from './material-icon.pipe';

@Component({
  selector: 'users-materials-card',
  imports: [
    CommonModule,
    MatCard,
    MatTooltip,
    MatCardContent,
    MatIcon,
    TemplateHoverDirective,
    DeleteButtonComponent,
    MaterialIconPipe,
    MaterialIconPipe,
    MaterialIconPipe,
    MatCardHeader,
    DeleteButtonComponent,
  ],
  templateUrl: './material-card.component.html',
  styleUrl: './material-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialCardComponent {
  @Input() material!: Material;
  
  @ViewChild('materialCard', { static: true, read: ElementRef }) hoverTarget!: ElementRef;
  
  @Output() deleteMaterialBtnClick = new EventEmitter<void>();
  
  onDeleteButtonClick() {
    this.deleteMaterialBtnClick.emit();
  }
}
