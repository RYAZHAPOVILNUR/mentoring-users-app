import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { CreateFolderButtonComponent } from '@users/libs/users/materials/feature-folders-create';
import { SharedFacade } from '../../../../data-access/src/lib/+state/sharedFacade';
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
  providers: [FoldersListContainerStore],
})
export class FoldersListContainerComponent  {
  private readonly router = inject(Router);
  private readonly componentStore = inject(FoldersListContainerStore);
  public facadeF = inject(SharedFacade);
  public readonly folders$ = this.facadeF.allFolders$;
  public readonly status$ = this.facadeF.statusFolders$;
  public readonly errors$ = this.facadeF.errorsFolders$;

  onDeleteFolder(folder: FoldersVM): void {
    this.componentStore.confirmDeleteFolder(folder);
  }

  onOpenFolder(folderId: number): void {
    this.router.navigate(['/materials', folderId]);
  }
}


