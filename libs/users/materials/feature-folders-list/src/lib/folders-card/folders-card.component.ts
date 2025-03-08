import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FoldersDTO } from '../../../../../../core/data-access/src';
import localeRu from '@angular/common/locales/ru'; // Импортируйте данные русской локализации
import localeEn from '@angular/common/locales/en';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EventEmitter} from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'folders-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, TranslateModule, MatButtonModule, MatCardModule,MatDialogModule],
  providers: [DatePipe, TranslatePipe],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  private clickCount = 0;
  ngOnInit() {
    registerLocaleData(localeRu, 'ru');
    registerLocaleData(localeEn, 'en'); // Регистрация локали
  };

  isHovered: boolean = false;

  @Input() folder!: FoldersDTO;
  @Input() lang!: string | undefined;

  @Output() deleteFolder = new EventEmitter();
  @Output() redirectToMaterials = new EventEmitter();

  ondeleteFolder(event: Event) {
    event.stopPropagation();
    this.deleteFolder.emit();
  }

  redirectToEditPage(editMode: boolean, event: Event) {
    const emitData = {
      id: +this.folder.id,
      editMode,
    };
    this.clickCount++;
    if(this.clickCount === 2) {
      this.redirectToMaterials.emit(emitData);
    }
  }
}
