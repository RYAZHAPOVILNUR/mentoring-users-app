import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersVM } from '@users/materials/data-access';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './folders-card.component.html',
  styleUrls: ['./folders-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersCardComponent {
  private readonly router = inject(Router);
  @Input({ required: true })
  folder!: FoldersVM;

  onOpenFolder(folder: FoldersVM) {
    // Получаем текущий URL без параметров
    const baseUrl = this.router.url.split('?')[0];
    // Формируем новый URL с id=123
    const newUrl = `${baseUrl}/${folder.id}`;
    // Переход на новый URL (сохранится в истории браузера)
    this.router.navigateByUrl(newUrl);
    console.log('Open Folder: >>>', newUrl);
  }
}
