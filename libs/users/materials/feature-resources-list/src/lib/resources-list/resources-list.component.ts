import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IMaterial } from '../../../../data-access/src/lib/models/models';
import { ResourceItemComponent } from '../resource-item/resource-item.component';

@Component({
  selector: 'resources-list',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatProgressBarModule, ResourceItemComponent],
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.scss']
})
export class ResourcesListComponent {
  @Input({ required: true })
  materialsVM!: {
    materials: IMaterial[],
    isLoading: boolean
  };

}
