import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsFacade } from '@users/materials/data-access';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { LetDirective } from '@ngrx/component';
import { ActivatedRoute, Router } from '@angular/router';
import { AddButtonComponent } from '@users/materials/shared';
import { FoldersAddDialogComponent } from '@users/materials/folders-create';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, FoldersListComponent, LetDirective, LetDirective, AddButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersListContainerComponent {
  public readonly facade = inject(MaterialsFacade);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  public readonly FoldersAddDialogComponent = FoldersAddDialogComponent;

  constructor() {
    this.facade.loadFolders();
  }

  onDeleteFolder(id: number): void {
    this.facade.deleteFolder(id);
  }

  onRevealFolder(id: number): void {
    this.facade.openFolder();
    this.router.navigate([id], { relativeTo: this.activatedRoute});
  }

  onAddFolder(title: string): void {
    this.facade.addFolder({ title });
  }
}
