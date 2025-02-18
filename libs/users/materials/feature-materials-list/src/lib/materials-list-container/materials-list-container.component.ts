import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsListComponent } from '../materials-list/materials-list.component';
import { DetailFolderCardVm } from '../materials-card/detail-folder-card-vm';
import { LetDirective } from '@ngrx/component';
import { FoldersEntity, FoldersFacade } from '@users/materials/data-access';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'users-materials-list-container',
  standalone: true,
  imports: [CommonModule, MaterialsListComponent, LetDirective],
  templateUrl: './materials-list-container.component.html',
  styleUrls: ['./materials-list-container.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListContainerComponent {
  private readonly foldersFacade = inject(FoldersFacade);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  public folder!: FoldersEntity;

  public readonly folder$: Observable<FoldersEntity | null> = this.foldersFacade.

  @Input()
  redirectToFolder!: DetailFolderCardVm;
}
