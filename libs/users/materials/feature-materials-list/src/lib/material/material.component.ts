import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-material',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialComponent {}
