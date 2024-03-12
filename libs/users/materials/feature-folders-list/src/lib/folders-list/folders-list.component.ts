import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create'
import { Folder } from '@users/materials/data-access';
import { LoadingStatus } from '@users/core/data-access';
@Component({
  selector: 'folders-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, FoldersCardComponent, FoldersAddButtonComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true })
  vm!: {
    status: LoadingStatus,
    folders: Folder[]
  };
  @Output()
  deleteFolder = new EventEmitter<number>();
  @Output()
  redirectToMaterials = new EventEmitter<{ id: number, folderName: string }>()
  public onDeleteFolder(id: number) {
    this.deleteFolder.emit(id)
  }

  public onRedirectToMaterials(id: number, folderName: string) {
    this.redirectToMaterials.emit({ id, folderName })
  }
}
