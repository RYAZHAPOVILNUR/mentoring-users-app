import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { MaterialsFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, LetDirective, MatProgressBarModule],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  public readonly allFolders$ = this.materialsFacade.allFolders$;
  public readonly foldersStatus$ = this.materialsFacade.foldersStatus$;

  constructor() {
    this.materialsFacade.loadFolders();
  }
}
