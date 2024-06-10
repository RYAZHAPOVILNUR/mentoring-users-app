import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-add-folder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFolderComponent {}
