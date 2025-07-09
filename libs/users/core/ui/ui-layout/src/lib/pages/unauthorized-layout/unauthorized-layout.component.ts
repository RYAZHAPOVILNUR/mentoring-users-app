import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule, MatButtonModule],
  templateUrl: './unauthorized-layout.component.html',
  styleUrls: ['./unauthorized-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnauthorizedLayoutComponent {}
