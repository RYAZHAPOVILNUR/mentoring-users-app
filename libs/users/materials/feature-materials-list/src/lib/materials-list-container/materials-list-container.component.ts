import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { LetDirective } from '@ngrx/component';
import {
  FoldersEntity,
  FoldersFacade,
  FoldersVM,
  MaterialsFacade,
  selectAllFolders,
  selectFiltredFolders,
  selectFolder,
  selectOpenedFolder,
} from '@users/materials/data-access';
import { MaterialsListContainerStore } from './materials-list-container.store';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AddMaterialButtonComponent, AddMaterialDialogComponent } from '@users/feature-materials-create';
import { Store } from '@ngrx/store';
import { loadFolders } from 'libs/users/materials/data-access/src/lib/+state/folders/folders.effects';
import { take } from 'rxjs';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsListComponent,
    LetDirective,
    RouterLink,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    AddMaterialButtonComponent,
    AddMaterialDialogComponent,
  ],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  private readonly componentStore = inject(MaterialsListContainerStore);
  public readonly materialsFacade = inject(MaterialsFacade);
  private readonly foldersFacade = inject(FoldersFacade);
  private readonly store = inject(Store);
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;
  public readonly materials$ = this.materialsFacade.filtredMaterials$;
  public openedFolder$: any = '';
  private readonly route = inject(ActivatedRoute);

  ngOnInit() {
    this.materialsFacade.loadMaterials();
    this.foldersFacade.init();
    this.foldersFacade.selectedFolder(Number(this.route.snapshot.paramMap.get('id')));
    this.store.select(selectOpenedFolder).subscribe((folder) => {
      folder?.title ? (this.openedFolder$ = folder) : '';
    });
  }
}
