import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { FoldersFacade } from '@users/materials/data-access';
import { FoldersAddButtonComponent } from 'libs/users/materials/feature-folders-create/src/lib/folders-add-button/folders-add-button.component';
import { FoldersVM } from 'libs/users/materials/view-models/folders-vm';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersListContainerStore } from './folders-list-container.store';

@Component({
  selector: 'users-folder-list-container',
  standalone: true,
  imports: [CommonModule, FoldersAddButtonComponent, FoldersListComponent, LetDirective],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FoldersListContainerStore],
})
export class FoldersListContainerComponent {
  private readonly componentStore = inject(FoldersListContainerStore);
  private readonly router = inject(Router)
  public readonly FoldersFacade = inject(FoldersFacade);
  public readonly folders$ = this.componentStore.folders$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;
  
  public onDeleteFolder(folder: FoldersVM) {
    this.componentStore.deleteFolder(folder);
  }
  
  public onRedirectToFolder(id: number) {
    this.router.navigate(['/materials', id]);
  }
}