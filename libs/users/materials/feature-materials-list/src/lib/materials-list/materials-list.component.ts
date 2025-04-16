import { ChangeDetectionStrategy, Component, EventEmitter, Input, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { MaterialsListVM } from './materials-list-view.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule, MaterialsCardComponent, NgIf, MatProgressBarModule, NgFor],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  @Input({ required: true })
  vm!: MaterialsListVM;
}
