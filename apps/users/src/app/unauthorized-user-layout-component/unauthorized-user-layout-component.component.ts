import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'users-unauthorized-user-layout-component',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './unauthorized-user-layout-component.component.html',
  styleUrls: ['./unauthorized-user-layout-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnauthorizedUserLayoutComponent {}
