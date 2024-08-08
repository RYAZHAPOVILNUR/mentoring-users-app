import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Folder, MaterialsErrors } from '@users/materials/data-access';
import { LoadingStatus } from '@users/core/data-access';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { FoldersAddButtonComponent } from '@users/materials/feature-folders-create'


type Vm = {
  folders: Folder[] | null,
  status: LoadingStatus,
  errors: MaterialsErrors | null,
}

@Component({
  selector: 'users-folders-list-ui',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, FoldersCardComponent, FoldersAddButtonComponent],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  @Input({ required: true })
  vm!: Vm;

  @Output() deleteFolder = new EventEmitter();
  @Output() openFolder = new EventEmitter();

  public onDeleteFolder(event: Event) {
    this.deleteFolder.emit(event)
  }

  public onOpenFolder(event: Event) {
    this.openFolder.emit(event)
  }
}
