import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { FolderType, MaterialsFacade } from '@users/materials/data-access';
import { PushPipe } from '@ngrx/component';


@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, PushPipe],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent implements OnInit {
  private readonly facade = inject(MaterialsFacade);
  @Input({required: true})
  folders!: FolderType[];
  @Output() folderToDelete = new EventEmitter<FolderType>();

  public onDeleteFolder(folder: FolderType) {
    this.folderToDelete.emit(folder);
  }

  ngOnInit() {
    this.facade.initFolders();
  }
}
