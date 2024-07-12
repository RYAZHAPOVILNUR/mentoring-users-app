import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { Folder, MaterialsFacade } from '@users/materials/data-access';
import { PushPipe } from '@ngrx/component';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, FoldersCardComponent, PushPipe, FoldersAddButtonComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent implements OnInit {
  private readonly materialsFacade = inject(MaterialsFacade);
  @Input({required: true})
  folders!: Folder[];
  @Output() deleteFolder = new EventEmitter<Folder>();
  @Output() openFolder = new EventEmitter<number>();

  public onDeleteFolder(folder: Folder) {
    this.deleteFolder.emit(folder);
  }

  public onOpenFolder(folder: Folder) {
    this.openFolder.emit(folder.id);
  }

  ngOnInit() {
    this.materialsFacade.initFolders();
  }
}
