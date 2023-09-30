import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'users-change-color',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    ColorPickerModule
  ],
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeColorComponent {
  constructor() {}

  color: string = '';

  onOKButtonClick() {
    console.log('Value on OK Button Click:', this.color);
  }
}
