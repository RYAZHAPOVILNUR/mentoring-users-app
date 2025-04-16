import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListContainerStore } from './folders-list-container.store';
import { FoldersVM } from '../../../../data-access/src/index';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { Router } from '@angular/router';
import { LetDirective } from '@ngrx/component';
import { CreateFolderButtonComponent } from '@users/feature-folder-create';
import { Store } from '@ngrx/store';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, LetDirective, CreateFolderButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FoldersListContainerStore],
})
export class FoldersListContainerComponent {
  private readonly componentStore = inject(FoldersListContainerStore);
  public readonly folders$ = this.componentStore.folders$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  onRedirectToFolder(folder: FoldersVM) {
    this.router.navigate([`/materials/${folder.id}`]);
  }
}
