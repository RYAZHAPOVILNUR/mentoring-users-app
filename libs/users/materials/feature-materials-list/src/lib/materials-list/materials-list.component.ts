import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Material } from '@users/materials-data-access';
import { MaterialComponent } from '../material/material.component';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MaterialComponent],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({ required: true }) public materials: Material[] = [];
}
