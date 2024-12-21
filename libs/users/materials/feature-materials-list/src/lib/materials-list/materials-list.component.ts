import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import {  MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IMaterial } from '../../../../data-access/src/lib/models/material.model';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MaterialsCardComponent, MatIconModule, MatButtonModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  @Input({required: true}) materials!: IMaterial[];
  location = inject(Location);

  goBack() {
    this.location.back();
  }
}
