import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoldersCardUiComponent } from '../folders-card-ui/folders-card-ui.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Folder, MaterialsFacade } from '@users/materials/data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoadingStatus } from '@users/core/data-access';

@Component({
  selector: 'users-folders-list-ui',
  standalone: true,
  imports: [
    CommonModule,
    FoldersCardUiComponent,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './folders-list-ui.component.html',
  styleUrls: ['./folders-list-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoldersListUiComponent {
  readonly materialsFacade = inject(MaterialsFacade);
  @Input({ required: true }) folders!: Folder[];
  @Input({ required: true }) status!: LoadingStatus;

  onAddButtonClick(): void {
    this.materialsFacade.openCreateFolderDialog();
  }
}
