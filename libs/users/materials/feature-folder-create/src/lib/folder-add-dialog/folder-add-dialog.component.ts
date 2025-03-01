import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-folder-add-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './folder-add-dialog.component.html',
  styleUrls: ['./folder-add-dialog.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FolderAddDialogComponent {}
