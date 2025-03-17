import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule, NgFor, NgIf, NgIfContext } from '@angular/common';
import { FoldersListVM } from './folders-list-view.module';
import { FoldersFacade, FoldersVM } from '@users/materials/data-access';
import { FoldersCardComponent } from '../folders-card/folders-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'users-folders-list',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FoldersCardComponent, MatProgressBarModule],
  templateUrl: './folders-list.component.html',
  styleUrls: ['./folders-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoldersListComponent {
  private readonly facade = inject(FoldersFacade);

  @Input({ required: true })
  vm!: FoldersListVM;

  @Output()
  redirectToFolder = new EventEmitter();

  onRedirectToFolder(folder: FoldersVM) {
    this.redirectToFolder.emit(folder);
  }
}
