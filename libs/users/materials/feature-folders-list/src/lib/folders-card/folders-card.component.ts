import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Folder } from 'libs/users/materials/data-access/src/lib/models/folder.model';
// import { registerLocaleData } from '@angular/common';
// import localeRu from '@angular/common/locales/ru'

// registerLocaleData(localeRu)
import '@angular/common/locales/global/ru'


@Component({
  selector: 'folders-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTooltipModule, MatMenuModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({required: true})
  folder!: Folder;

  @Output() deleteFolder = new EventEmitter();
  @Output() redirectToMaterialsPage = new EventEmitter()

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  onOpenMenu(event: Event) {
    event.stopPropagation();
    this.trigger.openMenu();
  }

  onDeleteFolder() {
    this.deleteFolder.emit()
  }

  onRedirectToMaterialsPage() {
    this.redirectToMaterialsPage.emit()
  }
}
