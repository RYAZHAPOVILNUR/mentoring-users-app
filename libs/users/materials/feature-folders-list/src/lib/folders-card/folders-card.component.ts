import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IFolder } from 'libs/users/materials/data-access/src/lib/models/folder.model';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, TranslateModule, MatButtonModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  @Input({ required: true })
  folder!: IFolder;

  @Output()
  deleteFolder = new EventEmitter();

  private translate = inject(TranslateService);

  onDeleteFolder(event: Event) {
    event.stopPropagation();
    this.deleteFolder.emit();
  }

  public translateDate(date: string | number | Date): string {
    const defaultLang = this.translate.getDefaultLang();
    const formattedDate = new Date(date).toLocaleString(defaultLang, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    return this.translate.instant(formattedDate);
  }
}
