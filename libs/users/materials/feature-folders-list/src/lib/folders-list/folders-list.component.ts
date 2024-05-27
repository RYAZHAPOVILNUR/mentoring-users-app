import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { FolderDTO, MaterialFacade } from '@users/materials/data-access';

@Component({
  selector: 'users-feature-folders-list',
  standalone: true,
  imports: [
    CommonModule,
    FoldersCardComponent,
  ],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureFoldersListComponent {
  private readonly facade = inject(MaterialFacade);

  @Input({ required: true }) folders!: FolderDTO[];

  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter<number>();

  onDeleteFolder(id: number) {
    this.deleteFolder.emit(id)
  }

  onOpenFolder(id: number) {
    this.openFolder.emit(id)
  }
}
