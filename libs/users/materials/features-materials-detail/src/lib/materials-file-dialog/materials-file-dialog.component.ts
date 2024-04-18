import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'users-materials-file-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './materials-file-dialog.component.html',
  styleUrls: ['./materials-file-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialsFileDialogComponent {
  public data = inject(MAT_DIALOG_DATA);
}
