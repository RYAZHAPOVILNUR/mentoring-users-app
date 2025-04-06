import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListContainerStore } from './folders-list-container.store';
import { NgIf, AsyncPipe } from '@angular/common';
import { FoldersListComponent } from "../folders-list/folders-list.component";
import { map } from 'rxjs';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    AsyncPipe,
    FoldersListComponent
  ],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FoldersListContainerStore]
})

export class FoldersListContainerComponent {
  private readonly componentStore = inject(FoldersListContainerStore)
  public readonly folders$ = this.componentStore.folders$.pipe(
  map(folders => folders ?? [])
  );
  @Output() deleteFolder = new EventEmitter<number>();
  
  constructor() {
    this.componentStore.loadFolders();
  }

  onDeleteFolder(folderId: number) {
    this.componentStore.deleteFolder(folderId);
  }

}
