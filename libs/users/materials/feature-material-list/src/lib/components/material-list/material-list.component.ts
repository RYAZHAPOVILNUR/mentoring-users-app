import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TrackByFunction,
} from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialStatus } from 'libs/users/materials/data-access/src/lib/enums/materials-status.enum';
import { Material } from 'libs/users/materials/data-access/src/lib/models/material.interface';
import { MaterialCardComponent } from '../material-card/material-card.component';
import { MaterialType } from '../../../../../feature-materials-create/src/lib/enums/material-type.enum';
import { MaterialAddButtonComponent } from '../../../../../feature-materials-create/src/lib/components/materials-add-button/materials-add-button.component';
import { AddMaterialDialogService } from '../../../../../feature-materials-create/src/lib/services/add-material-dialog.service';
import { Folder } from 'libs/users/materials/data-access/src/lib/models/folder.interface';

export interface MaterialVm {
  materials: Material[];
  status: MaterialStatus;
  error: Error | null;
  openedFolder: Folder | null;
}

@Component({
  standalone: true,
  selector: 'users-material-list[materialVm]',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MaterialCardComponent,
    MaterialAddButtonComponent,
  ],
  providers: [AddMaterialDialogService],
})
export class MaterialListComponent {
  private readonly addMaterialDialogService = inject(AddMaterialDialogService);

  @Input() public materialVm!: MaterialVm;
  @Output() public deleteMaterial = new EventEmitter<number>();

  public readonly trackByFn: TrackByFunction<Material> = (
    _index,
    entity: Material
  ): number => entity.id;

  public onOptionSelected(type: MaterialType) {
    this.addMaterialDialogService
      .showAddMaterialDialog({
        parentFolderId: this.materialVm.openedFolder?.id ?? null,
        type,
      })
      .subscribe();
  }
}
