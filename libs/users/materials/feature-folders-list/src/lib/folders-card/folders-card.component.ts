import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FoldersDTO } from '@users/core/data-access';
import localeRu from '@angular/common/locales/ru'; // Импортируйте данные русской локализации
import localeEn from '@angular/common/locales/en';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { DeepReadonly } from '@users/core/utils';

@Component({
  selector: 'folders-card',
  standalone: true,
  imports: [DatePipe, MatIconModule, TranslateModule, MatButtonModule, MatCardModule, MatDialogModule],
  providers: [DatePipe, TranslatePipe],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  private clickCount = 0;
  constructor() {
    registerLocaleData(localeRu, 'ru');
    registerLocaleData(localeEn, 'en');
  }

  @Input() folder!: DeepReadonly<FoldersDTO>;
  @Input() lang!: string | null;

  @Output() deleteFolder = new EventEmitter();
  @Output() redirectToMaterials = new EventEmitter();

  ondeleteFolder(event: Event) {
    event.stopPropagation();
    this.deleteFolder.emit();
  }

  redirectToEditPage(editMode: boolean) {
    const emitData = {
      id: +this.folder.id,
      editMode,
    };
    this.clickCount++;
    if (this.clickCount === 2) {
      this.redirectToMaterials.emit(emitData);
    }
  }
}
