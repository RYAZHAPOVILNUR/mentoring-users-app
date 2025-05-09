import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersFacade } from '@users/materials/data-access';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule,  MatProgressBarModule, FoldersListComponent,  LetDirective],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {

  private readonly foldersFacade = inject(FoldersFacade);

  public readonly folders$ = this.foldersFacade.allFolders$;
  public readonly status$ = this.foldersFacade.foldersStatus$;
  public readonly errors$ = this.foldersFacade.foldersError$;

  constructor(){
    this.foldersFacade.initFolders();
  }
  
}
