import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';
import { MaterialsFacade } from '@users/materials/data-access';
import { FolderType } from 'libs/users/materials/data-access/src/lib/+state/folder.materials.model';
import { FoldersListContainerStore } from './folders-list-container.store';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterOutlet,
    FoldersListComponent,
    LetDirective,
  ],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FoldersListContainerStore]
})
export class FoldersListContainerComponent {
  private readonly componentStore = inject(FoldersListContainerStore);
  public foldersFacade = inject(MaterialsFacade);
  public readonly folders$ = this.componentStore.folders$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;

  onDeleteFolder(folder: FolderType) {
    this.componentStore.deleteFolder(folder);
  }
}
