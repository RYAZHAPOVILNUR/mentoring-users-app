import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MaterialsVM } from './materials-view-model';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsDTO } from '@users/core/data-access';
import { MaterialsAddButtonComponent } from '@users/materials/feature-materials-create';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MaterialsCardComponent,
    MatProgressBarModule,
    MaterialsAddButtonComponent,
  ],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Output() public readonly closeFolderEvent = new EventEmitter();
  @Output() public readonly deleteMaterialEvent =
    new EventEmitter<MaterialsDTO>();
  @Output() public readonly openDialogEvent = new EventEmitter<string>();
  @Output() public readonly openMaterialEvent =
    new EventEmitter<MaterialsDTO>();
  @Input({ required: true }) public vm!: MaterialsVM;

  public onDeleteClick(material: MaterialsDTO) {
    this.deleteMaterialEvent.emit(material);
  }
  public closeFolder() {
    this.closeFolderEvent.emit();
  }
  public openDialog(materialType: string) {
    this.openDialogEvent.emit(materialType);
  }
  public openMaterial(material: MaterialsDTO) {
    this.openMaterialEvent.emit(material);
  }
}
