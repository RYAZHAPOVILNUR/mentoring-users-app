import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { FoldersListComponent, FoldersVM } from '../folders-list/folders-list.component';
import { LetDirective } from '@ngrx/component';
import { FoldersFacade } from '../../../../data-access/src/lib/+state/folders/folders.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, FoldersListComponent, LetDirective],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersListContainerComponent implements OnInit {
  ngOnInit() {
    this.FoldersFacade.loadFolders()
    this.folders$.subscribe(folders => console.log('Folders in component:', folders));
  }

  public FoldersFacade = inject(FoldersFacade);
  public readonly folders$: Observable<FoldersVM[]> = this.FoldersFacade.folders$;

  onDeleteFolder(folderId: number): void {
    this.FoldersFacade.deleteFolder(folderId)
  }

  ngAfterViewChecked(): void {
    console.log(this.folders$);
  }
}

