import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderDTO } from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-materials-folder-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './materials-folder-card.component.html',
  styleUrls: ['./materials-folder-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsFolderCardComponent {
  @Input({ required: true })
  folder!: FolderDTO;

  @Output() deleteFolder = new EventEmitter();

  public onDeleteFolder(e: Event): void {
    e.stopPropagation();
    this.deleteFolder.emit();
  }
}
