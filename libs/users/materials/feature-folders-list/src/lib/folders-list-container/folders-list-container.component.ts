import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersAddButtonComponent } from 'libs/users/materials/feature-folders-create/src/lib/folders-add-button/folders-add-button.component';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersListContainerStore } from './folders-list-container.store';
import { foldersFacade } from 'libs/users/materials/data-access/src';
import { LetDirective } from '@ngrx/component';
import { FoldersVM } from 'libs/users/materials/view-models/folders-vm';
import { Router } from '@angular/router';

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
  public readonly foldersFacade = inject(foldersFacade);
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
