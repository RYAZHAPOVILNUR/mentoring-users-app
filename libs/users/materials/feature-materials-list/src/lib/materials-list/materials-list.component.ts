import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
// import { selectFolderById } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MaterialsCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  @Input({ required: true })
  vm!: any;

  // folderId!: number;
  // folder$!: any;

  // ngOnInit() {
  //   // Получаем ID из URL
  //   this.route.paramMap.subscribe((params) => {
  //     this.folderId = Number(params.get('id')); // Получаем ID из URL
  //     this.loadFolderName(this.folderId); // Загружаем название папки
  //   });
  // }

  // loadFolderName(folderId: number) {
  //   // Используем селектор для получения папки по ID
  //   this.folder$ = this.store.select(selectFolderById(folderId));
  //   console.log('Folder Id', this.folder$);
  // }
}
