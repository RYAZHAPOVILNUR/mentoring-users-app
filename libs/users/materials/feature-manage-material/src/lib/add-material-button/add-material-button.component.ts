import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-add-material-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-material-button.component.html',
  styleUrls: ['./add-material-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMaterialButtonComponent {}
