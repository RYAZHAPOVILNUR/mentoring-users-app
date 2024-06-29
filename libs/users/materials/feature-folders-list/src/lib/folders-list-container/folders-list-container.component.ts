import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListContainerStore } from './folders-list-container.store';
import { LetDirective } from '@ngrx/component';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { CreateFoldersButtonComponent } from '@users/users/materials/feature-folders-create';
import { Folder } from '@users/users/materials/data-access';
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [
    CommonModule,
    LetDirective,
    FoldersListComponent,
    CreateFoldersButtonComponent,
  ],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FoldersListContainerStore],
})
export class FoldersListContainerComponent {
  private readonly componentStore = inject(FoldersListContainerStore);
  private readonly router = inject(Router);

  public readonly folders$ = this.componentStore.folders$;
  public readonly status$ = this.componentStore.status$;
  public readonly error$ = this.componentStore.error$;

  onDeleteFolder(folder: Folder) {
    this.componentStore.deleteFolder(folder);
  }

  onNavigateToMaterials(id: number) {
    this.router.navigate(['/materials/', id])
  }
}
