import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Location, NgForOf, NgIf } from '@angular/common';
import { FoldersCardUiComponent } from '@users/materials/feature-folders-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsCardUiComponent } from '../materials-card-ui/materials-card-ui.component';
import { Folder, MaterialEntity, MaterialsFacade } from '@users/materials/data-access';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoadingStatus } from '@users/core/data-access';

@Component({
  selector: 'users-materials-list-ui',
  standalone: true,
  imports: [
    MaterialsCardUiComponent,
    FoldersCardUiComponent,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './materials-list-ui.component.html',
  styleUrls: ['./materials-list-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialsListUiComponent {
  private readonly materialsFacade = inject(MaterialsFacade);
  private readonly location = inject(Location);

  @Input({ required: true }) materials!: MaterialEntity[];
  @Input({ required: true }) status!: LoadingStatus;
  @Input({ required: true }) folder?: Folder;

  onAddButtonClick(): void {
    this.materialsFacade.openCreateMaterialDialog();
  }

  onBackButtonClick() {
    this.location.back();
  }
}







