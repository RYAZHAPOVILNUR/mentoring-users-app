import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MaterialsFacade } from '@users/materials/data-access';
import { FoldersListVM } from './folders-list.vm';
import { IFolderVM } from '../../folders.vm';
import { FoldersAddButtonComponent } from '@users/feature-folders-create';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, FoldersAddButtonComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  materialFacade = inject(MaterialsFacade);
  @Input({required: true}) vm!: FoldersListVM
  @Output() deleteFolderList = new EventEmitter();
  @Output() openFolder = new EventEmitter<number>();

  public onDeleteFolderList(folder: IFolderVM) {
    this.deleteFolderList.emit(folder);
  }
  public onOpenFolder(id: number) {
    this.openFolder.emit(id)
  }
}
