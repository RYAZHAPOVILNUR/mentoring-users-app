import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FoldersAddButtonComponent } from '@users/materials/folders-create';
import { MaterialsFacade } from '@users/materials/data-access';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { LetDirective } from '@ngrx/component';
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, FoldersAddButtonComponent, FoldersListComponent, LetDirective, LetDirective],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersListContainerComponent {
  public readonly facade = inject(MaterialsFacade);
  private readonly router = inject(Router);

  constructor() {
    localStorage.removeItem('revealedFolder');
  }

  onDeleteFolder(id: number): void {
    this.facade.deleteFolder(id);
  }

  onRevealFolder(id: number): void {
    this.facade.revealFolder(id);
    this.router.navigate([`materials/${id}`]);
  }
}
