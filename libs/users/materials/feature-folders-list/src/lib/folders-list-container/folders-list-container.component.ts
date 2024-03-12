import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsFacade } from '@users/materials-data-access';
import { LetDirective } from '@ngrx/component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { AddFolderButtonComponent } from '@users/feature-create-folder';

@Component({
  selector: 'folders-list-container',
  standalone: true,
  imports: [CommonModule, LetDirective, MatProgressBarModule, FoldersListComponent, AddFolderButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListContainerComponent implements OnInit {
  private readonly materialsFacade = inject(MaterialsFacade);
  public folders$ = this.materialsFacade.folders$;
  public loadingStatus$ = this.materialsFacade.loadingStatus$;

  // public loadingStatus$ = 'error';

  ngOnInit(): void {
    this.materialsFacade.loadFolders();
  }

  public createFolder(title: string) {
    this.materialsFacade.addFolder(title);
  }
}
