import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'users-back-nav-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './back-nav-button.component.html',
  styleUrls: ['./back-nav-button.component.scss'],
})
export class BackNavButtonComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back()
  }
}
