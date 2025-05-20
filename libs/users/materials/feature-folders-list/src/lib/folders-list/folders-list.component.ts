import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersType } from '@users/materials/data-access';
import { FoldersCardComponent } from "../folders-card/folders-card.component";
import { FoldersAddButtonComponent } from '@users/feature-folders-create';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, FoldersAddButtonComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({required: true}) 
  folders!: FoldersType[];

  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter<number>();

  public onDeleteFolder (folder: FoldersType) {
    this.deleteFolder.emit(folder);
  }

  public onOpenFolder(id: number) {
    this.openFolder.emit(id)
  }

}
