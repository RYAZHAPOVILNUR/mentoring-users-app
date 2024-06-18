import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { Folder, MaterialsFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, LetDirective, MatProgressBarModule, FoldersAddButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  public readonly allFolders$ = this.materialsFacade.allFolders$;
  public readonly foldersStatus$ = this.materialsFacade.foldersStatus$;
  private readonly router = inject(Router);

  constructor() {
    this.materialsFacade.loadFolders();
  }

  public deleteFolder(folder: Folder): void {
    this.materialsFacade.deleteFolder(folder.id);
  }

  openFolder(id: number): void {
    this.router.navigate([`/materials/`, id]);
  }
}
