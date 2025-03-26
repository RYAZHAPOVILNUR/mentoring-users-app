import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { FoldersFacade } from '@users/materials/data-access';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersAddButtonComponent } from '../../../../feature-folders-create/src/lib/folders-add-button/folders-add-button';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, MatIconModule, MatButtonModule, FoldersAddButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
})
export class FoldersListContainerComponent implements OnInit {
  private readonly facade = inject(FoldersFacade);

  public readonly folders$ = this.facade.folders$;
  public readonly loading$ = this.facade.isLoading$;

  ngOnInit(): void {
    this.facade.loadAllFolders();
  }
}
