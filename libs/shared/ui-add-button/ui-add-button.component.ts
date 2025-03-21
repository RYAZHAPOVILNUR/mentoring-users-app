import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ui-add-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './ui-add-button.component.html',
  styleUrls: ['./ui-add-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiAddButtonComponent {}
