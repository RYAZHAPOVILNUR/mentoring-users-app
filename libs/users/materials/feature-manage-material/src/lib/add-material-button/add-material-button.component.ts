import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'users-add-material-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTooltipModule, MatIconModule, MatMenuModule],
  templateUrl: './add-material-button.component.html',
  styleUrls: ['./add-material-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMaterialButtonComponent {
  public readonly materialTypes = ['Видео', 'Файл PDF', 'Подкаст'];
}
