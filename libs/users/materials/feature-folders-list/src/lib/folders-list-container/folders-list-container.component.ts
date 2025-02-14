import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { FoldersVM, MaterialsFacade } from '@users/materials/data-access';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersListContainerStore } from './folders-list-container.store';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, LetDirective, FoldersAddButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  providers: [FoldersListContainerStore],
})
export class FoldersListContainerComponent {
  private readonly router = inject(Router);
  private readonly componentStore = inject(FoldersListContainerStore);
  private readonly materialsFacade = inject(MaterialsFacade);
  public readonly folders$ = this.componentStore.folders$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;

  onDeleteFolder(folder: FoldersVM) {
    this.componentStore.deleteFolder(folder);
  }

  onRedirectToMaterials(folderId: number) {
    this.router.navigate(['/materials', folderId]);
    this.materialsFacade.loadMaterials();
  }
}
