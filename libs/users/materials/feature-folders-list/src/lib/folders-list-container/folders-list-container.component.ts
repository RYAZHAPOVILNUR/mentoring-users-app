import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFoldersListComponent } from '../folders-list/folders-list.component';
import { FoldersAddButtonComponent } from '@users/feature-folders-create'
import { MaterialFacade } from '@users/materials/data-access';
import { Router } from '@angular/router';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [
    CommonModule,
    FeatureFoldersListComponent,
    FoldersAddButtonComponent,
    FoldersCardComponent,
    LetDirective,
  ],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
})
export class FoldersListContainerComponent {
  private readonly facade = inject(MaterialFacade);
  private readonly router = inject(Router);
  public readonly folders$ = this.facade.folders$;
  public readonly folderStatus$ = this.facade.status$

  onDeleteFolder(id: number): void {
    this.facade.deleteFolder(id);
  }

  onOpenFolder(id: number): void {
    this.router.navigate([`materials/${id}`]);
  }
}
