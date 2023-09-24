import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-feature-user-general',
  standalone: true,
  imports: [CommonModule, MatTabsModule],
  templateUrl: './feature-user-general.component.html',
  styleUrls: ['./feature-user-general.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureUserGeneralComponent {}
