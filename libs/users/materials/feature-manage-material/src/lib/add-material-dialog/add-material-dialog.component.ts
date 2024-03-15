import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-add-material-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-material-dialog.component.html',
  styleUrls: ['./add-material-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMaterialDialogComponent {}
