import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IMaterial } from '../../../../data-access/src/lib/models/material.model';
import { MaterialsAddButtonComponent } from '@users/feature-materials-create';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MaterialsCardComponent,
    MatIconModule,
    MatButtonModule,
    MaterialsAddButtonComponent,
  ],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true }) materials!: IMaterial[];
  @Output() public deleteMaterial = new EventEmitter();
  private location = inject(Location);

 public goBack() {
    this.location.back();
  }

 public onDeleteMaterial(id: number) {
    this.deleteMaterial.emit(id);
  }
}
