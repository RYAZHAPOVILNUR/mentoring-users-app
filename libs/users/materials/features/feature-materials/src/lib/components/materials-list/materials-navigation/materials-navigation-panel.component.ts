import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { filter, first, tap } from 'rxjs';

import { FoldersFacade } from '@users/materials/data-access-folders';

@Component({
  selector: 'users-materials-navigation',
  imports: [CommonModule, MatIcon, MatIconButton, MatTooltip, MatProgressSpinner],
  templateUrl: './materials-navigation-panel.component.html',
  styleUrl: './materials-navigation-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsNavigationPanelComponent {
  private readonly router = inject(Router);
  private readonly foldersFacade = inject(FoldersFacade);
  readonly folderTitle$ = this.foldersFacade.folderTitle$;

  constructor() {
    this.foldersFacade.folders$
      .pipe(
        first(),
        filter(({ length }) => !length),
        tap(() => this.foldersFacade.loadFolders()),
      )
      .subscribe();
  }

  backToFolders() {
    return this.router.navigate(['/materials']);
  }
}
