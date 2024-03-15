import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-delete-material-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-material-dialog.component.html',
  styleUrls: ['./delete-material-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteMaterialDialogComponent {}
