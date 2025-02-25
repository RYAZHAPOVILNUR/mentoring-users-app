import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialsFacade } from '@users/materials/data-access';
import { FoldersVM } from 'libs/users/materials/folder-vm';
import { FolderListContainerStore } from './folder-list-container.store';
import {FoldersCreateButtonComponent} from 'libs/users/materials/feature-create-materials/src/lib/create-folders-button/create-folders-button.component';
import {FolderListComponent} from '../folder-list/folder-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { LetDirective } from '@ngrx/component';
@Component({
  selector: 'folder-list-container',
  standalone: true,
  imports: [CommonModule,
            FoldersCreateButtonComponent,
            FolderListComponent,
            MatButtonModule,
            MatDialogModule,
            LetDirective,
          ],
  templateUrl: './folder-list-container.component.html',
  styleUrls: ['./folder-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FolderListContainerStore],
})
export class FolderListContainerComponent {
  private readonly componentStore = inject(FolderListContainerStore);
  public materialsFacade = inject(MaterialsFacade);
  public readonly folders$ = this.componentStore.folders$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;
  public readonly openedFolder$ = this.materialsFacade.openedFolder$;
  private readonly router = inject(Router);

  onDeleteFolder(folder: FoldersVM) {
    this.componentStore.deleteFolder(folder);
  }

  onRedirectToEdit({ id, editMode }: { id: number; editMode: boolean }) {
    this.router.navigate(['/admin/folders', id], {
      queryParams: { edit: editMode },
    });
  }
}
