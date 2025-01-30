import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersFacade } from 'libs/users/materials/data-access/src/lib/+state/folders/folders.facade';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, LetDirective],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent {
	private readonly foldersFacade = inject(FoldersFacade);
	public readonly allFolders$ = this.foldersFacade.allFolders$;
	public readonly status$ = this.foldersFacade.status$;
	public readonly errors$ = this.foldersFacade.errors$;

	constructor() {
		this.foldersFacade.initFolders
	}
}

