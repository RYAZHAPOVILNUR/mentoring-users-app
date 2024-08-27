import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersListComponent } from '../folders-list/folders-list.component';
import { MaterialsFacade } from '@users/materials/data-access';
import { LetDirective } from '@ngrx/component';
import { CreateFoldersButtonComponent } from '@users/feature-folders-create';
import { Router } from '@angular/router';

@Component({
  selector: 'users-folders-list-container',
  standalone: true,
  imports: [CommonModule, FoldersListComponent, LetDirective, CreateFoldersButtonComponent],
  templateUrl: './folders-list-container.component.html',
  styleUrls: ['./folders-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FoldersListContainerComponent implements OnInit {
  ngOnInit(): void {
    this.MaterialsFacade.initFolders();
  }

  public MaterialsFacade = inject(MaterialsFacade);
  public readonly folders$ = this.MaterialsFacade.allFolders$;
  private readonly router = inject(Router);

  onDeleteFolder(folderId: number) {
    this.MaterialsFacade.deleteFolder(folderId);
  }

  onOpenFolder(id: number) {
    this.router.navigate(['/materials', id]);
  }
}
