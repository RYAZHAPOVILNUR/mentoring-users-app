import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';
import { IMaterial } from 'libs/users/materials/data-access/src/lib/models/materials.model';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { MaterialsListVM } from './materials-list-view-model';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MaterialsCardComponent, MatButtonModule, MatIconModule, MatProgressBarModule],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  private readonly router = inject(Router);

  @Input({ required: true })
  vm!: MaterialsListVM;

  @Output()
  deleteMaterial = new EventEmitter();

  onDeleteMaterial(material: IMaterial) {
    this.deleteMaterial.emit(material);
  }

  public closeFolder() {
    this.router.navigate(['/materials']);
  }
}
