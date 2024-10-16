import { ChangeDetectionStrategy, Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { FoldersListComponent, FoldersVM } from '../folders-list/folders-list.component';
import { LetDirective } from '@ngrx/component';
import { FoldersFacade } from '../../../../data-access/src/lib/+state/folders/folders.facade';
import { Observable } from 'rxjs';
import { IFolder } from '../../../../data-access/src/lib/models/folder.interface';
import {
  FoldersAddButtonComponent
} from '../../../../feature-folders-create/src/lib/folders-add-button/folders-add-button.component';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, FoldersListComponent, LetDirective, FoldersAddButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersListContainerComponent implements OnInit {
  @Output() addFolder = new EventEmitter<IFolder>()

  public foldersFacade = inject(FoldersFacade);
  public readonly folders$: Observable<IFolder[]> = this.foldersFacade.folders$;


  ngOnInit() {
    this.foldersFacade.loadFolders()
  }

  onDeleteFolder(folderId: number): void {
    this.foldersFacade.deleteFolder(folderId)
  }
}
