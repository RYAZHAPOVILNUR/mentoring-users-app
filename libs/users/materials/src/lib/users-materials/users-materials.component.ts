import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'users-users-materials',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './users-materials.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersMaterialsComponent {}
