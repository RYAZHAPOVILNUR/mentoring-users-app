import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
}
