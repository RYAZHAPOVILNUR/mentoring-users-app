import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MaterialsListVM } from './materials-list-view-model';
import { MaterialsCardComponent } from '../materials-card/materials-card.component';

@Component({
  selector: 'users-materials-list',
  standalone: true,
  imports: [CommonModule,  MatIconModule, RouterModule, MaterialsCardComponent,  MatButtonModule,],
  templateUrl: './materials-list.component.html',
  styleUrls: ['./materials-list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsListComponent {

  @Input({ required: true })
  public vm!: MaterialsListVM;
}
