// materials.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as MaterialActions from '../../../data-access/src/lib/+state/folders/folders.action';
import { selectAllFolders } from '../../../data-access/src/lib/+state/folders/folder.selector'; // селектор для получения всех папок
import { FolderDTO } from '../../../data-access/src/lib/+state/models/folder.model'; // DTO папки
import { CommonModule } from '@angular/common';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-materials',
  templateUrl: './users-materials.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class UsersMaterialsComponent implements OnInit {
  folders$!: Observable<FolderDTO[]>;  // Наблюдаемый поток папок

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Инициализация: запуск экшн для загрузки папок при инициализации компонента
    this.store.dispatch(MaterialActions.loadFolders());

    // Подписка на папки из состояния
    this.folders$ = this.store.select(selectAllFolders);
     // Добавляем логи, чтобы проверить, приходят ли данные
     this.folders$.subscribe(folders => {
      console.log('Received folders:', folders);  // Логируем данные из хранилища
    });
  }
}
