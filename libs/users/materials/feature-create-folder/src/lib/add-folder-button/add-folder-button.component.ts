import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'users-add-folder-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './add-folder-button.component.html',
  styleUrls: ['./add-folder-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFolderButtonComponent {
  public openCreateFolderDialog(): void {
    console.log('click openCreateFolderDialog');
  }
}
