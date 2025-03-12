import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListContainerStore } from './folders-list-container.store';
import { Router } from '@angular/router';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { LetDirective } from '@ngrx/component';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { FoldersEntity } from '@users/core/data-access';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, LetDirective, FoldersAddButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FoldersListContainerStore]
})
export class FoldersListContainerComponent {
  private readonly componentStore = inject(FoldersListContainerStore);
  public readonly folders$ = this.componentStore.folders$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;
  private readonly router = inject(Router);


  public onDeleteFolder(dataForDeleteFolder: { folderId: number; folderTitle: string }) {
    const { folderId, folderTitle } = dataForDeleteFolder;
    this.componentStore.deleteFolder(folderId, folderTitle);
  }

  public onOpenFolder(folderSomeData: { folderId: number; folderTitle: string }) {
    const { folderId, folderTitle } = folderSomeData;
    this.router.navigate(['materials', folderId], { queryParams: { folderTitle } });
  }

  public onEditFolder(folder: FoldersEntity) {
    this.componentStore.editFolder(folder);
  }
}
