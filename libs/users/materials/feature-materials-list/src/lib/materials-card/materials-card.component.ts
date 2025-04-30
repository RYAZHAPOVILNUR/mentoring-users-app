import { ChangeDetectionStrategy, Component, inject, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MaterialsVM } from '@users/materials/data-access';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'users-materials-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule,],
  templateUrl: './materials-card.component.html',
  styleUrls: ['./materials-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsCardComponent {

  @Input({ required: true })
  public material!: MaterialsVM;

  public dialog = inject(MatDialog);

}
