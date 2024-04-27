import { FoldersFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { FolderCreateButtonComponent } from '@users/feature-folders-create';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, FolderCreateButtonComponent, LetDirective, MatProgressBarModule],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent implements OnInit {
  private readonly foldersFacade = inject(FoldersFacade);
  public readonly folders$ = this.foldersFacade.allFolders$;
  public readonly status$ = this.foldersFacade.status$;
  public readonly errors$ = this.foldersFacade.error$;

  ngOnInit(): void {
    this.foldersFacade.load();
  }
}
