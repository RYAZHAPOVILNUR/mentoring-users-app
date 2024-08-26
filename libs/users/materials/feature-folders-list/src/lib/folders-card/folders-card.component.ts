import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Folder } from 'libs/users/materials/data-access/src/lib/models/folder.model';
import { LocaleDateFormatPipe } from '@users/pipes';

@Component({
  selector: 'folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, MatMenuModule, LocaleDateFormatPipe],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  public showButton: boolean = false;

  @Input({required: true})
  folder!: Folder;

  @Output() deleteFolder = new EventEmitter();
  @Output() redirectToMaterialsPage = new EventEmitter()

  onDeleteFolder(event: Event) {
    event.stopPropagation();
    this.deleteFolder.emit()
  }

  onRedirectToMaterialsPage() {
    this.redirectToMaterialsPage.emit()
  }
}
