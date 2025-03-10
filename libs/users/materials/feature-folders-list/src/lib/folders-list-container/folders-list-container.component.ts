import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { NgFor } from '@angular/common';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { Router } from '@angular/router';
import { FoldersListContainerStore } from './folders-list-container.store';
import { LetDirective } from '@ngrx/component';
import { UsersListComponent } from '@users/feature-users-list';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersDTO } from '@users/core/data-access';
import { MatDialogModule } from '@angular/material/dialog';
import { LanguageSwitchService } from '@users/users/core/ui/language-switch';

@Component({
  selector: 'folders-container',
  standalone: true,
  imports: [FoldersAddButtonComponent, LetDirective, UsersListComponent, FoldersListComponent,NgFor, MatDialogModule,
  ],
  providers: [FoldersListContainerStore],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {

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
