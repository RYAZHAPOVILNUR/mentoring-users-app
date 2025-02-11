import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { FoldersFacade } from '@users/data-access';
import { CreateFolderButtonComponent } from '@users/libs/users/materials/feature-folders-create';
import { FoldersVM } from '../../../../folders-vm';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersListContainerStore } from './folders-list-container.store';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [
    CommonModule,
    FoldersListComponent,
    LetDirective,
    CreateFolderButtonComponent
  ],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FoldersListContainerStore],  // Add this line to provide FoldersFacade in the component's providers array.  // This allows the FoldersFacade to be injected into the component.  // This is necessary for the FoldersFacade to subscribe to the folders$ observable and update the component's template.  // If you don't provide FoldersFacade in the component's providers array, the FoldersFacade won't be injected and the component won't subscribe to the folders$ observable.
})
export class FoldersListContainerComponent  { // Add this line to implement OnInit in the component.  // This is necessary for the FoldersFacade to subscribe to the folders$ observable and update the component's template.'{
  public foldersFacade = inject(FoldersFacade);
  private readonly router = inject(Router);
  private readonly componentStore = inject(FoldersListContainerStore);

  public readonly folders$ = this.foldersFacade.allFolders$;
  public readonly status$ = this.foldersFacade.status$;
  public readonly errors$ = this.foldersFacade.errors$;

  onDeleteFolder(folder: FoldersVM): void {
    this.componentStore.confirmDeleteFolder(folder);
  }

  onOpenFolder(folderId: number): void {
    this.router.navigate(['/materials', folderId]);
  }
}

