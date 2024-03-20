import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-open-material-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './open-material-dialog.component.html',
  styleUrls: ['./open-material-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenMaterialDialogComponent {}
