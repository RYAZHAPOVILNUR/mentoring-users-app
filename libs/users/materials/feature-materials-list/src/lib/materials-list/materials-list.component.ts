import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MaterialsListVM } from '../materials-list-vm';
import { MaterialVM } from '@users/materials/data-access';

@Component({
  selector: 'materials-list',
  standalone: true,
  imports: [
    CommonModule,
    MaterialsCardComponent,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true })
  vm!: MaterialsListVM;

  @Output() redirectToFoldersList = new EventEmitter();
  @Output() openMaterialFile = new EventEmitter();

  constructor() {
    console.log('materials list run');
  }

  onRedirectToFoldersList() {
    this.redirectToFoldersList.emit();
  }

  onOpenMaterialFile(material: MaterialVM) {
    this.openMaterialFile.emit({material});
  }

}
