import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FolderListContainerStore } from './folder-list-conatiner.store';
import { FoldersFacade } from '@users/materials/data-access';
import { FoldersVM } from '../../../../vm/folders-vm';
import { LetDirective } from '@ngrx/component';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, LetDirective, FoldersAddButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FolderListContainerStore],
})
export class FoldersListContainerComponent {
  private readonly componentStore = inject(FolderListContainerStore);
  public foldersFacade = inject(FoldersFacade);
  public folders$ = this.componentStore.folders$;
  public status$ = this.componentStore.status$;
  private readonly router = inject(Router);

  public onDeleteFolder(folder: FoldersVM): void {
    this.componentStore.deleteFolder(folder);
  }

  public onOpenFolder(id: number): void {
    this.router.navigate([`/materials/${id}`]);
  }
}
