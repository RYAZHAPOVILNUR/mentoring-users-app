import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

@Component({
  selector: 'users-articles-create-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './articles-create-button.component.html',
  styleUrls: ['./articles-create-button.component.scss'],
})
export class ArticlesCreateButtonComponent {
  constructor(private router: Router) {}

  openCreateArticle(): void {
    this.router.navigate(['/article-editor'], {
      queryParams: { mode: 'create' },
    });
  }
}
