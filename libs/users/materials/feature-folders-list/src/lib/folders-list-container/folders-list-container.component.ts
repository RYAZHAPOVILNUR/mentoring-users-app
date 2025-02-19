import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFoldersButtonComponent } from '@libs/users/materials/feature-folders-create/feature-folders-create';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { Router } from '@angular/router';
import { FoldersListContainerStore } from './folders-list-container.store';
import { LetDirective } from '@ngrx/component';
import { FoldersEntity } from '@users/core/data-access';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folders-list-container',
  standalone: true,
  imports: [CommonModule, CreateFoldersButtonComponent, FoldersListComponent, LetDirective],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  providers: [FoldersListContainerStore],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {
  private readonly componentStore = inject(FoldersListContainerStore);
  private readonly router = inject(Router);

  public readonly folders$ = this.componentStore.folders$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;

  public onDeleteFolder(dataForDeleteFolder: { folderId: number; folderTitle: string }) {
    const { folderId, folderTitle } = dataForDeleteFolder;
    this.componentStore.deleteFolder(folderId, folderTitle);
  }

  public onEditFolder(folder: FoldersEntity) {
    this.componentStore.editFolder(folder);
  }

  public onInMaterial(folderSomeData: { folderId: number; folderTitle: string }) {
    const { folderId, folderTitle } = folderSomeData;
    this.router.navigate(['materials', folderId], { queryParams: { folderTitle } });
  }
}
