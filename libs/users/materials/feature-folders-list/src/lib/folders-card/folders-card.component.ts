import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  LOCALE_ID,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { IFolder } from '@users/materials/data-access';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
registerLocaleData(localeRu);

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    NgFor,
    MatIconModule,
    MatDividerModule,
    DatePipe,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'ru',
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({ required: true })
  folder!: IFolder;
  @Output() deleteCard = new EventEmitter();
  @Output() openFolder = new EventEmitter();

  onDeleteCard(event: Event) {
    event.stopPropagation();
    this.deleteCard.emit(this.folder);
  }

  onOpenFolder() {
    this.openFolder.emit(this.folder);
  }
}
