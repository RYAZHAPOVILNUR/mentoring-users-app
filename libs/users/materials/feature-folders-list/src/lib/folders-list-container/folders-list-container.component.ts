import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
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
	private readonly componentStore = inject(FoldersListContainerStore);

  public readonly folders$ = this.componentStore.folders$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;

  constructor() {
    this.componentStore.loadFolders();
  }

  public onDeleteFolder(folder:FoldersVM): void {
    this.componentStore.confirmDeleteFolder(folder);
  }
}

