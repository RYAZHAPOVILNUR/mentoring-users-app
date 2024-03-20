import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-open-materal-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './open-materal-dialog.component.html',
  styleUrls: ['./open-materal-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenMateralDialogComponent {}
