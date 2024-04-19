import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Button } from './button.interface';

@Component({
  selector: 'create-material-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './create-material-button.component.html',
  styleUrls: ['./create-material-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateMaterialButtonComponent {
  public readonly buttons: Button[] = [
    { icon: 'videocam', value: 'video' },
    { icon: 'podcasts', value: 'podcast' },
    { icon: 'picture_as_pdf', value: 'pdf' },
  ];

  public isButtonsVisible = false;

  public onToggleFab(): void {
    this.isButtonsVisible = !this.isButtonsVisible;
  }

  public onClickHandler(value: string): void {
    console.log(value);
  }
}
