import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { IFolder } from '@users/materials/data-access';
import { Router } from '@angular/router';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';
import { LetDirective } from '@ngrx/component';
import { FoldersListContainerStore } from './folders-list-container.store';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, FoldersAddButtonComponent, LetDirective],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FoldersListContainerStore],
})
export class FoldersListContainerComponent {
  private readonly componentStore = inject(FoldersListContainerStore);

  private readonly router = inject(Router);

  public readonly folders$ = this.componentStore.folders$;
  public readonly foldersStatus$ = this.componentStore.foldersStatus$;
  public readonly errors$ = this.componentStore.foldersErrors$;

  onDeleteFolder(folder: IFolder) {
    this.componentStore.onDeleteFolder(folder);
  }
  onOpenFolder(id: number) {
    this.router.navigate(['/materials', id]);
  }
}
