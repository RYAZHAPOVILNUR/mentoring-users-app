import { ChangeDetectionStrategy, Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { FoldersFacade } from '@users/materials/data-access';
import { Router } from '@angular/router';
import { FoldersListContainerStore } from './folders-list-container.store';
import { LetDirective } from '@ngrx/component';
import { UsersListComponent } from '../../../../../users/feature-users-list/src';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersDTO } from '../../../../../../core/data-access/src';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LanguageSwitchService } from '../../../../../core/ui/language-switch/src';

@Component({
  selector: 'folders-container',
  standalone: true,
  imports: [CommonModule, FoldersAddButtonComponent, LetDirective, UsersListComponent, FoldersListComponent,NgFor, MatDialogModule,
  ],
  providers: [FoldersListContainerStore],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {
  private readonly foldersFacade = inject(FoldersFacade);

  private readonly componentStore = inject(FoldersListContainerStore);
  private readonly langService = inject(LanguageSwitchService);
  public readonly folders$ = this.componentStore.folders$;
  public readonly status$ = this.componentStore.status$;
  public readonly errors$ = this.componentStore.errors$;
  public readonly lang$ = this.langService.selectedLanguage$;
  private readonly router = inject(Router);

  onDeleteFolder(folder: FoldersDTO) {
    this.componentStore.deleteFolder(folder);
  }

  onRedirectToMaterials({ id, editMode }: { id: number; editMode: boolean }) {
    this.router.navigate(['/materials', id], {
      queryParams: { edit: editMode },
    });
  }
}
