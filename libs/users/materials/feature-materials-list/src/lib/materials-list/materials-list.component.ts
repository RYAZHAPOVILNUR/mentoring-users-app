import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TMaterialDTO, TMaterialListVM } from '@users/materials/data-access';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';

@Component({
  selector: 'materials-list',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule, MaterialsCardComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true })
  vm!: TMaterialListVM;

  @Output() deleteMaterial = new EventEmitter();

  @Output() redirectToMaterialContent = new EventEmitter();

  public onDeleteMaterial(material: TMaterialDTO): void {
    this.deleteMaterial.emit(material);
  }

  public onRedirectToMaterialContent(id: number): void {
    this.redirectToMaterialContent.emit(id);
  }
}
