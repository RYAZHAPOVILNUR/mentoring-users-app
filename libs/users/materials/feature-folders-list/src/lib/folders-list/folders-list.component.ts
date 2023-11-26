import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { IFolder } from '@users/materials/data-access';
import { FoldersAddButtonComponent } from '../../../../feature-folders-create/src/lib/folders-add-button/folders-add-button.component';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule,
    FoldersCardComponent,
    FoldersAddButtonComponent
  ],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({required: true})
  folders!: IFolder[];

  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter<number>();

  public onDeleteFolder(folder: IFolder) {
    this.deleteFolder.emit(folder)
  }

  public onOpenFolder(id: number) {
    this.openFolder.emit(id)
  }
}
