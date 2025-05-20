import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { FoldersType } from '@users/materials/data-access';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({required: true}) 
  folder!: FoldersType;

  @Output() deleteFolder = new EventEmitter();

   public onDeleteFolder (folder: FoldersType) {
    this.deleteFolder.emit(folder);
  }

}
