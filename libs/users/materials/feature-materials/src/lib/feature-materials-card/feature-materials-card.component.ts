import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IMaterial } from 'libs/users/materials/data-access/src/lib/model/folders-models';
import { MaterialContentComponent } from '../material-content/material-content.component';

@Component({
  selector: 'users-feature-materials-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule, 
    MatButtonModule, 
    MatMenuModule, 
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './feature-materials-card.component.html',
  styleUrls: ['./feature-materials-card.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureMaterialsCardComponent {
  private readonly destroyRef = inject(DestroyRef);
  public dialog = inject(MatDialog);

  @Input()
  material!: IMaterial;

}
