import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-feature-materials-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-materials-container.component.html',
  styleUrls: ['./feature-materials-container.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class FeatureMaterialsContainerComponent {}
