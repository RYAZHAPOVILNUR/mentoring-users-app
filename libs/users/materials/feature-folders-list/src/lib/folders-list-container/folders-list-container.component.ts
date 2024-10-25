import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { LetDirective } from '@ngrx/component';
import { FoldersFacade } from '@users/materials/data-access';
import { Observable } from 'rxjs';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { Router } from '@angular/router';
import { FoldersVM } from '@users/materials';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, FoldersListComponent, LetDirective, FoldersAddButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersListContainerComponent implements OnInit {
  public foldersFacade = inject(FoldersFacade);
  public readonly folders$: Observable<FoldersVM[]> = this.foldersFacade.folders$;
  public readonly router = inject(Router)

  ngOnInit() {
    this.foldersFacade.loadFolders();
  }

  public onDeleteFolder(folderId: number): void {
    this.foldersFacade.deleteFolder(folderId);
  }
  public onOpenFolder(id: number) {
    this.router.navigate(['/materials', id]);
  }
}
