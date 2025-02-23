import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'materials-materials-content-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './materials-content-dialog.component.html',
  styleUrls: ['./materials-content-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsContentDialogComponent {}
