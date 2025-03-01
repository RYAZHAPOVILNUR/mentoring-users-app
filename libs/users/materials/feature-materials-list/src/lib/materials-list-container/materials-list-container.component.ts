import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { LetDirective } from '@ngrx/component';
import {
  FoldersEntity,
  FoldersFacade,
  MaterialsEntity,
  MaterialsFacade,
  initMaterials,
  selectFiltredMaterials,
  selectMaterialsEntities,
} from '@users/materials/data-access';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MaterialsListContainerStore } from './materials-list-container.store';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable, map, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectArticlesEntities } from 'libs/users/articles/data-access/src/lib/+state/articles.selectors';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsListComponent,
    LetDirective,
    MaterialsCardComponent,
    RouterLink,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  private readonly componentStore = inject(MaterialsListContainerStore);
  // private readonly foldersfacade = inject(FoldersFacade);
  public readonly materialsFacade = inject(MaterialsFacade);
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  public readonly allMaterials$ = this.componentStore.materials$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;
  // public readonly materials$ = this.materialsFacade.
  public folder!: FoldersEntity;
  public material!: MaterialsEntity;
  // private storege!: MaterialsStore;

  // public readonly allMaterials$ = this.store.select(selectFiltredMaterials);

  materials$ = this.route.paramMap.pipe(
    map((params) => Number(params.get('id'))), // Получаем id из URL
    switchMap((id) => {
      console.log('List ID', id);
      return this.allMaterials$.pipe(
        map((materials) => materials.filter((material) => material.folderId === id)) // Фильтруем по id
      );
    })
  );

  constructor() {}

  ngOnInit() {
    this.materialsFacade.loadMaterials();
    // this.store.dispatch(initMaterials());
    //this.componentStore.init();
  }

  // public readonly folder$: Observable<FoldersEntity | null> = this.foldersfacade.openedFolder$.pipe(
  //   tap((folder) => {
  //     if (!folder) {
  //       this.foldersfacade.loadFolder();
  //     } else {
  //       this.folder = folder;
  //     }
  //   })
  // );

  //   public readonly materials$: Observable<MaterialsEntity | null> = this.materialsFacade.openedMaterial$.pipe(
  //     tap((material) => {
  //       if (!material) {
  //         this.materialsFacade.loadMaterials();
  //       } else {
  //         this.material = material;
  //       }
  //     })
  //   );
}
