import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsCardComponent } from "../materials-card/materials-card.component";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MaterialsList } from './material-list.model';
import { MaterialDTO } from '@users/materials/data-access';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MaterialsCardComponent, MatProgressBarModule, MatIconModule,
    MatButtonModule,],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true })
  vm!: MaterialsList;


  @Output() deleteMaterial = new EventEmitter();
  onDeleteMaterial(material: MaterialDTO): void {
    this.deleteMaterial.emit(material)
  }

  @Output() backOnFolders = new EventEmitter();
  public onBackOnFolders() {
    this.backOnFolders.emit()
  }
}
