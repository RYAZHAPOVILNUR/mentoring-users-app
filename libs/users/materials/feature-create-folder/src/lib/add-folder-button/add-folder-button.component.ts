import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-add-folder-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-folder-button.component.html',
  styleUrls: ['./add-folder-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFolderButtonComponent {}
